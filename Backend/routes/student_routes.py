from flask import Blueprint, request, jsonify
from model import Prediction, Student, User, db

student = Blueprint("student", __name__)

def _build_cors_preflight_response():
    """Build CORS preflight response"""
    response = jsonify({'message': 'CORS preflight'})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    return response

# ---------------------------
# CREATE STUDENT PROFILE
# ---------------------------
@student.route("/student/create/<int:user_id>", methods=["POST", "OPTIONS"])
def create_student_profile(user_id):
    """Create student profile for a user"""
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    try:
        data = request.json
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Verify user exists and is a student
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        if user.role != 'student':
            return jsonify({'message': 'User is not a student'}), 400
        
        # Check if student profile already exists
        existing_student = Student.query.filter_by(user_id=user_id).first()
        if existing_student:
            return jsonify({'message': 'Student profile already exists'}), 409
        
        # Validate required fields
        required_fields = ['name', 'usn', 'semester', 'attendance', 'study_hours', 'iat_marks', 'assignments']
        for field in required_fields:
            if field not in data:
                return jsonify({'message': f'{field} is required'}), 400
        
        # Check if USN already exists
        if Student.query.filter_by(usn=data['usn']).first():
            return jsonify({'message': 'USN already exists'}), 409
        
        # Create student profile
        new_student = Student(
            user_id=user_id,
            name=data['name'],
            usn=data['usn'],
            semester=data['semester'],
            attendance=float(data['attendance']),
            study_hours=float(data['study_hours']),
            iat_marks=float(data['iat_marks']),
            assignments=int(data['assignments']),
            extra_curricular=data.get('extra_curricular', 0)
        )
        
        db.session.add(new_student)
        db.session.commit()
        
        return jsonify({
            'message': 'Student profile created successfully',
            'student_id': new_student.id,
            'name': new_student.name,
            'usn': new_student.usn
        }), 201
    
    except ValueError as e:
        return jsonify({'message': f'Invalid data type: {str(e)}'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500


# ---------------------------
# GET STUDENT PROFILE
# ---------------------------
@student.get("/student/<int:user_id>")
def get_student_profile(user_id):
    """Get student profile by user_id"""
    try:
        student_profile = Student.query.filter_by(user_id=user_id).first()
        
        if not student_profile:
            return jsonify({'message': 'Student profile not found'}), 404
        
        return jsonify({
            'id': student_profile.id,
            'user_id': student_profile.user_id,
            'name': student_profile.name,
            'usn': student_profile.usn,
            'semester': student_profile.semester,
            'attendance': student_profile.attendance,
            'study_hours': student_profile.study_hours,
            'iat_marks': student_profile.iat_marks,
            'assignments': student_profile.assignments,
            'extra_curricular': student_profile.extra_curricular,
            'prediction': student_profile.prediction,
            'consistency_rating': student_profile.consistency_rating,
            'predicted_grade': student_profile.predicted_grade
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500

