from flask import Flask, jsonify, request
from flask_cors import CORS
from model import db, Student, User, Faculty,Prediction
from routes.student_routes import student
from routes.download_routes import download
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.exc import IntegrityError
import pandas as pd
import os
import uuid
from datetime import datetime
import pickle
import numpy as np

try:
    from joblib import load as joblib_load
except ImportError:
    joblib_load = None


app = Flask(__name__)

# -------------------------------------------------------------------
# Configuration
# -------------------------------------------------------------------
app.config["SECRET_KEY"] = os.getenv(
    "SECRET_KEY", "dev-secret-key-change-in-production"
)
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv(
    "DATABASE_URL", "sqlite:///student_perf.sqlite3"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# CORS Configuration - restrict in production
CORS(app)

db.init_app(app)

# Register route blueprints

app.register_blueprint(student)
app.register_blueprint(download)


@app.route("/")
def home():
    return jsonify(
        {
            "message": "Backend running!",
            "version": "1.0",
            "endpoints": {
                "auth": ["/signup", "/login"],
                "students": ["/students", "/students/<id>", "/history/<id>"],
                "predict": ["/predict"],
            },
        }
    )


@app.route("/health")
def health():
    """Health check endpoint"""
    return (
        jsonify({"status": "healthy", "timestamp": datetime.utcnow().isoformat()}),
        200,
    )


# -------------------------------------------------------------------
# Auth Routes
# -------------------------------------------------------------------
@app.route("/signup", methods=["POST", "OPTIONS"])
def signup():
    """Signup endpoint for students and faculty"""
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight"}), 200

    data = request.json or {}

    username = data.get("username")
    password = data.get("password")
    role = data.get("role")  # "student" or "faculty"

    if not username or not password or not role:
        return jsonify({"error": "Missing required fields"}), 400

    # Check if username already exists
    existing = User.query.filter_by(username=username).first()
    if existing:
        return jsonify({"error": "Username already taken"}), 400

    role = role.lower()

    # NOTE: if you want hashed passwords, uncomment this:
    # hashed_pw = generate_password_hash(password)
    # new_user = User(username=username, password=hashed_pw, role=role)
    new_user = User(username=username, password=password, role=role)

    try:
        # Add user to session first
        db.session.add(new_user)
        db.session.flush()  # assign new_user.id without commit

        # Role-specific required fields and creation
        if role == "student":
            name = data.get("name")
            usn = data.get("usn")
            semester = data.get("semester")

            if not (name and usn and semester):
                db.session.rollback()
                return (
                    jsonify(
                        {
                            "error": "Missing student fields: name, usn, semester",
                        }
                    ),
                    400,
                )

            # ensure USN unique
            if Student.query.filter_by(usn=usn).first():
                db.session.rollback()
                return jsonify({"error": "USN already exists"}), 400

            student = Student(
                user_id=new_user.id, name=name, usn=usn, semester=semester
            )
            db.session.add(student)
            db.session.commit()

            return (
                jsonify(
                    {
                        "message": "Signup successful",
                        "success": True,
                        "role": "student",
                        "user_id": new_user.id,
                        "student_id": student.id,
                    }
                ),
                201,
            )

        else:  # faculty
            name = data.get("name")
            department = data.get("department")
            subject = data.get("subject")
            designation = data.get("designation")

            if not (name and department and subject and designation):
                db.session.rollback()
                return (
                    jsonify(
                        {
                            "error": "Missing faculty fields: name, department, subject, designation",
                        }
                    ),
                    400,
                )

            faculty = Faculty(
                user_id=new_user.id,
                name=name,
                designation=designation,
                subject=subject,
                department=department,
            )
            db.session.add(faculty)
            db.session.commit()

            return (
                jsonify(
                    {
                        "message": "Signup successful",
                        "success": True,
                        "role": "faculty",
                        "user_id": new_user.id,
                        "faculty_id": faculty.id,
                    }
                ),
                201,
            )

    except IntegrityError as e:
        db.session.rollback()
        return (
            jsonify(
                {
                    "error": "Database integrity error",
                    "details": str(e.orig),
                }
            ),
            400,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Server error", "details": str(e)}), 500


@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    """Login endpoint for all users"""
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight"}), 200

    try:
        data = request.json or {}

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Username and password required"}), 400

        # Find user
        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify({"error": "Invalid credentials"}), 401

        # If using hashed passwords, uncomment:
        # if not check_password_hash(user.password, password):
        #     return jsonify({"error": "Invalid credentials"}), 401

        profile_data = {}

        if user.role == "student":
            student_profile = Student.query.filter_by(user_id=user.id).first()
            if student_profile:
                profile_data = {
                    "student_id": student_profile.id,
                    "name": student_profile.name,
                    "usn": student_profile.usn,
                    "semester": student_profile.semester,
                }
            redirect = "/student-dashboard"
        elif user.role == "faculty":
            faculty_profile = Faculty.query.filter_by(user_id=user.id).first()
            if faculty_profile:
                profile_data = {
                    "faculty_id": faculty_profile.id,
                    "name": faculty_profile.name,
                    "designation": faculty_profile.designation,
                    "department": faculty_profile.department,
                }
            redirect = "/faculty-dashboard"
        else:
            redirect = "/"

        return (
            jsonify(
                {
                    "message": "Login successful",
                    "user_id": user.id,
                    "username": user.username,
                    "role": user.role,
                    "redirect": redirect,
                    **profile_data,
                }
            ),
            200,
        )

    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 500


# -------------------------------------------------------------------
# ML Models: paths + loader
# -------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")

MODEL_CONFIDENCE_PATH = os.path.join(MODEL_DIR, "best_model_confidence_level.pkl")
MODEL_GRADE_PATH = os.path.join(
    MODEL_DIR, "best_model_predicted_grade.pkl"
)  # file name has space & (1)
MODEL_PASSFAIL_PATH = os.path.join(MODEL_DIR, "best_model_predictor.pkl")

model_confidence = None
model_grade = None
model_passfail = None


def load_sklearn_model(path: str):
    """Try joblib first (if available), then pickle; return None on failure."""
    if not os.path.exists(path):
        print(f"⚠️ Model file does not exist: {path}")
        return None

    # Try joblib if available
    if joblib_load is not None:
        try:
            m = joblib_load(path)
            print(f"✅ Loaded model via joblib: {path}")
            return m
        except Exception as e:
            print(f"⚠️ joblib load failed for {path}: {e}")

    # Fallback to pickle
    try:
        with open(path, "rb") as f:
            m = pickle.load(f)
        print(f"✅ Loaded model via pickle: {path}")
        return m
    except Exception as e:
        print(f"❌ Failed to load model from {path}: {e}")
        return None


# Load all models at startup
def load_models():
    global model_confidence, model_grade, model_passfail

    print("🔄 Loading ML models...")
    model_confidence = load_sklearn_model(MODEL_CONFIDENCE_PATH)
    model_grade = load_sklearn_model(MODEL_GRADE_PATH)
    model_passfail = load_sklearn_model(MODEL_PASSFAIL_PATH)

    if not all([model_confidence, model_grade, model_passfail]):
        print(
            "⚠️ One or more models failed to load. "
            "Check versions / retrain in this environment."
        )
    else:
        print("✅ All models loaded successfully!")


# -------------------------------------------------------------------
# Prediction Route
# -------------------------------------------------------------------

@app.route("/predict", methods=["POST"])
def predict():
    """
    Expected JSON body:
    {
        "attendance": 85,
        "studyHours": 3.5,
        "iatMarks": 72,
        "assignmentMarks": 80,
        "consistency": 7,
        "extracurricular": "Club Activity",
        "student_id": 1
    }
    """
    try:
        data = request.get_json() or {}

        # 1) Validate required fields are present and not empty/null
        required = [
            "attendance",
            "studyHours",
            "iatMarks",
            "assignmentMarks",
            "consistency",
            "extracurricular",
            "student_id",
        ]
        missing = [r for r in required if r not in data or data[r] in (None, "")]
        if missing:
            return (
                jsonify({"error": f"Missing or null fields: {', '.join(missing)}"}),
                400,
            )

        # 2) Parse and validate student_id
        try:
            student_id = int(data["student_id"])
        except (TypeError, ValueError):
            return jsonify({"error": "student_id must be an integer"}), 400

        # 3) Build a DataFrame with the EXACT column names used in training
        # CSV columns: attendance,study_hours,IAT_marks,assignment,extracurricular_activity,consistency_rating
        try:
            features = pd.DataFrame(
                [
                    {
                        "attendance": float(data["attendance"]),
                        "study_hours": float(data["studyHours"]),
                        "IAT_marks": float(data["iatMarks"]),
                        "assignment": float(data["assignmentMarks"]),
                        "extracurricular_activity": str(data["extracurricular"]),
                        "consistency_rating": float(data["consistency"]),
                    }
                ]
            )
        except (TypeError, ValueError) as e:
            # This catches things like float(None) or float("abc")
            return jsonify({"error": f"Invalid input types: {e}"}), 400

        # 4) Ensure models are loaded
        if model_grade is None or model_confidence is None or model_passfail is None:
            return jsonify({"error": "Models not loaded"}), 500

        # 5) Predict grade
        grade_pred = model_grade.predict(features)[0]

        # 6) Predict confidence (regression-like)
        try:
            conf_pred = model_confidence.predict(features)[0]
            confidence = float(conf_pred)
        except Exception:
            confidence = None

        # 7) Predict pass/fail and map to nice string without unsafe int()
        pf_raw = model_passfail.predict(features)[0]

        if isinstance(pf_raw, str):
            # e.g. "pass" / "fail"
            if pf_raw.lower() in ["pass", "passed", "1"]:
                pass_fail = "Pass"
            elif pf_raw.lower() in ["fail", "failed", "0"]:
                pass_fail = "Fail"
            else:
                pass_fail = pf_raw
        elif pf_raw is None or (isinstance(pf_raw, float) and np.isnan(pf_raw)):
            pass_fail = "Unknown"
        else:
            # Numeric style: 1 = pass, 0 = fail
            try:
                num = float(pf_raw)
                pass_fail = "Pass" if round(num) == 1 else "Fail"
            except (TypeError, ValueError):
                pass_fail = str(pf_raw)

        # 8) Create Prediction record (NOTE: using student_id from above)
        record = Prediction(
            student_id=student_id,
            attendance=float(data["attendance"]),
            study_hours=float(data["studyHours"]),
            iat_marks=float(data["iatMarks"]),
            assignments=float(data["assignmentMarks"]),
            extra_curricular=data["extracurricular"],  # okay if column is String; else map to int
            consistency_rating=float(data["consistency"]),
            predicted_grade=str(grade_pred),
            confidence_level=str(confidence) if confidence is not None else None,
            prediction=pass_fail,
        )

        db.session.add(record)
        db.session.commit()
        print("committed")

        return (
            jsonify(
                {
                    "status": "success",
                    "predicted_grade": str(grade_pred),
                    "confidence_level": confidence,
                    "prediction": pass_fail,
                }
            ),
            200,
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500




@app.route("/faculty/students", methods=["GET"])
def get_all_predictions_for_all_students():

    rows = (
        db.session.query(Prediction, Student)
        .join(Student, Prediction.student_id == Student.id)
        .order_by(Student.usn.asc(), Prediction.created_at.desc())
        .all()
    )

    results = []

    for prediction, student in rows:
        conf = prediction.confidence_level
        if conf is None:
            confidence_str = None
        else:
            try:
                num = float(conf)
                confidence_str = f"{num:.0f}%"
            except (ValueError, TypeError):
                s = str(conf)
                confidence_str = s if s.endswith("%") else s + "%"

        results.append({
            "name": student.name,
            "usn": student.usn,
            "predicted_grade": prediction.predicted_grade,
            "prediction": prediction.prediction,
            "confidence_level": confidence_str
        })

    return jsonify(results), 200

@app.route("/test-join", methods=["GET"])
def test_join():
    rows = (
        db.session.query(Student, Prediction)
        .join(Prediction, Prediction.student_id == Student.id)
        .all()
    )

    result = []
    for student, prediction in rows:
        result.append({
            "student_id": student.id,
            "name": student.name,
            "usn": student.usn,
            "predicted_grade": prediction.predicted_grade,
            "prediction": prediction.prediction,
            "confidence_level": prediction.confidence_level,
            "created_at": prediction.created_at.isoformat(),
        })

    return jsonify(result), 200


# -------------------------------------------------------------------
# App entry
# -------------------------------------------------------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Database initialized")
        load_models()

    port = int(os.getenv("PORT", 6969))
    debug = os.getenv("FLASK_ENV", "development") == "development"

    app.run(debug=debug, port=port, host="0.0.0.0")
