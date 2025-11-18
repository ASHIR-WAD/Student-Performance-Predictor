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

    # Create user entry
    user_id = str(uuid.uuid4())
    hashed_pw = generate_password_hash(password)

    new_user = User(
        id=user_id,
        username=username,
        password=hashed_pw,
        role=role
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Signup successful",
        "user_id": user_id,
        "role": role
    }), 201

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
