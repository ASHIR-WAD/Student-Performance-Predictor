from flask import Flask, jsonify, request
from flask_cors import CORS
from model import db,Student,User,Faculty
from routes.student_routes import student
from routes.download_routes import download
from routes.auth_routes import auth
from werkzeug.security import generate_password_hash, check_password_hash
import os
import uuid
from datetime import datetime



app = Flask(__name__)

# Configuration
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///student_perf.sqlite3")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# CORS Configuration - restrict in production
CORS(app)




db.init_app(app)

# Register route blueprints
app.register_blueprint(auth)
app.register_blueprint(student)
app.register_blueprint(download)

@app.route("/")
def home():
    return jsonify({
        "message": "Backend running!",
        "version": "1.0",
        "endpoints": {
            "auth": ["/register", "/login", "/verify", "/logout"],
            "students": ["/students", "/students/<id>", "/history/<id>"],
            "predict": ["/predict"]
        }
    })

@app.route("/health")
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }), 200

@app.route("/signup", methods=["POST", "OPTIONS"])
def signup():
    """Signup endpoint for students and faculty"""
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight"}), 200
    
    data = request.json

    username = data.get("username")
    password = data.get("password")
    role = data.get("role")  # "student" or "faculty"


    if not username or not password or not role:
        return jsonify({"error": "Missing required fields"}), 400

    # Check if username already exists
    existing = User.query.filter_by(username=username).first()
    if existing:
        return jsonify({"error": "Username already taken"}), 400

    role=role.lower()
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
                return jsonify({"error": "Missing student fields: name, usn, semester"}), 400

            # ensure USN unique
            if Student.query.filter_by(usn=usn).first():
                db.session.rollback()
                return jsonify({"error": "USN already exists"}), 400

            student = Student(
                user_id=new_user.id,
                name=name,
                usn=usn,
                semester=semester
            )
            db.session.add(student)
            db.session.commit()

            return jsonify({
                "message": "Signup successful",
                "role": "student",
                "user_id": new_user.id,
                "student_id": student.id
            }), 201

        else:  # faculty
            name = data.get("name")
            department = data.get("department")
            subject = data.get("subject")
            designation = data.get("designation")

            if not (name and department and subject and designation):
                db.session.rollback()
                return jsonify({"error": "Missing faculty fields: name, department, subject, designation"}), 400

            faculty = Faculty(
                user_id=new_user.id,
                name=name,
                designation=designation,
                subject=subject,
                department=department
            )
            db.session.add(faculty)
            db.session.commit()

            return jsonify({
                "message": "Signup successful",
                "role": "faculty",
                "user_id": new_user.id,
                "faculty_id": faculty.id
            }), 201

    except IntegrityError as e:
        db.session.rollback()
        # return helpful message (don't expose raw DB error in production)
        return jsonify({"error": "Database integrity error", "details": str(e.orig)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Server error", "details": str(e)}), 500

@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    """Login endpoint for all users"""
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight"}), 200
    
    try:
        data = request.json
        
        username = data.get("username")
        password = data.get("password")
        role = data.get("role")
        
        if not username or not password:
            return jsonify({"error": "Username and password required"}), 400
        
        # Find user
        user = User.query.filter_by(username=username).first()
        
        if not user:
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Check password
        if not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid credentials"}), 401
        
        # Check role if provided
        if role and user.role != role:
            return jsonify({"error": "Invalid role"}), 401
        
        # Get additional profile info based on role
        profile_data = {}
        
        if user.role == "student":
            student_profile = Student.query.filter_by(user_id=user.id).first()
            if student_profile:
                profile_data = {
                    "student_id": student_profile.id,
                    "name": student_profile.name,
                    "usn": student_profile.usn,
                    "semester": student_profile.semester
                }
            redirect = "/student/dashboard"
        elif user.role == "faculty":
            faculty_profile = Faculty.query.filter_by(user_id=user.id).first()
            if faculty_profile:
                profile_data = {
                    "faculty_id": faculty_profile.id,
                    "name": faculty_profile.name,
                    "designation": faculty_profile.designation,
                    "department": faculty_profile.department
                }
            redirect = "/faculty/dashboard"
        else:
            redirect = "/dashboard"
        
        return jsonify({
            "message": "Login successful",
            "user_id": user.id,
            "username": user.username,
            "role": user.role,
            "redirect": redirect,
            **profile_data
        }), 200
    
    except Exception as e:
        return jsonify({"error": f"Login failed: {str(e)}"}), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Database initialized")
    
    port = int(os.getenv("PORT", 6969))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    
    app.run(debug=debug, port=port, host="0.0.0.0")
