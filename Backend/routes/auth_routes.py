from flask import Blueprint, request, jsonify
from model import User, Student, db
from datetime import datetime

auth = Blueprint("auth", __name__)

def _build_cors_preflight_response():
    """Build CORS preflight response"""
    response = jsonify({'message': 'CORS preflight'})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    return response

# ---------------------------
# REGISTER USER
# ---------------------------
@auth.route("/register", methods=["POST", "OPTIONS"])
def register():
    """Register a new user (student or teacher)"""
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    
    try:
        data = request.json
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Validate required fields
        required_fields = ['username', 'password', 'role']
        for field in required_fields:
            if field not in data:
                return jsonify({'message': f'{field} is required'}), 400
        
        # Check if username already exists
        if User.query.filter_by(username=data['username']).first():
            return jsonify({'message': 'Username already exists'}), 409
        
        # Create new user
        new_user = User(
            username=data['username'],
            password=data['password'],  # In production, hash this
            role=data['role']
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({
            'message': 'User registered successfully',
            'user_id': new_user.id,
            'username': new_user.username,
            'role': new_user.role
        }), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500


# ---------------------------
# LOGIN USER
# ---------------------------
@auth.route("/login", methods=["POST", "OPTIONS"])
def login():
    """Login user"""
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    
    try:
        data = request.json
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        username = data.get('username')
        password = data.get('password')
        role = data.get('role')
        
        if not username or not password:
            return jsonify({'message': 'Username and password required'}), 400
        
        # Find user
        user = User.query.filter_by(username=username, password=password, role=role).first()
        
        if not user:
            return jsonify({'message': 'Invalid credentials'}), 401
        
        # Get redirect URL based on role
        redirect_url = "/teacher/dashboard" if user.role == "teacher" else "/student/dashboard"
        
        return jsonify({
            'message': 'Login successful',
            'user_id': user.id,
            'username': user.username,
            'role': user.role,
            'redirect': redirect_url
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500
