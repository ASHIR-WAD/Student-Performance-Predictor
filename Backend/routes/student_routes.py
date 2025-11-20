from flask import Blueprint, request, jsonify
from model import Prediction, Student, User, db

student = Blueprint("student", __name__,url_prefix="/student")

def _build_cors_preflight_response():
    """Build CORS preflight response"""
    response = jsonify({'message': 'CORS preflight'})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    return response




@student.route("/submit-data", methods=["POST", "OPTIONS"])
def submit_data():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight"}), 200

    try:
        data = request.json

        attendance = data.get("attendance")
        study_hours = data.get("studyHours")
        iat_marks = data.get("iatMarks")
        assignment_marks = data.get("assignmentMarks")
        extracurricular = data.get("extracurricular")
        consistency = data.get("consistency")
        student_id = data.get("student_id")  # optional

        # Basic validation
        if attendance is None or study_hours is None or iat_marks is None:
            return jsonify({"error": "Missing required fields"}), 400

        # Your ML model prediction (dummy response for now)
        predicted_score = (
            float(attendance) * 0.3 +
            float(study_hours) * 0.2 +
            float(iat_marks) * 0.3 +
            float(assignment_marks) * 0.1 +
            float(consistency) * 0.1
        )

        result = {
            "success": True,
            "message": "Insights generated successfully",
            "predicted_score": round(predicted_score, 2),
            "improvement_tips": [
                "Increase study hours for better performance",
                "Focus more on assignments",
                "Maintain consistency for long-term success"
            ]
        }

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500






