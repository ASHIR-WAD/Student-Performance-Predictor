from flask import Blueprint, jsonify, send_file
from model import Student, Prediction, db
import csv
import json
import io
from datetime import datetime

download = Blueprint("download", __name__)

# ---------------------------
# DOWNLOAD STUDENT DATA AS CSV
# ---------------------------
@download.get("/download/student/<int:student_id>/csv")
def download_student_csv(student_id):
    """Download student data and prediction history as CSV"""
    try:
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({'message': 'Student not found'}), 404
        
        # Get prediction history
        predictions = Prediction.query.filter_by(student_id=student_id).all()
        
        # Create CSV in memory
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Write student info header
        writer.writerow(['STUDENT INFORMATION'])
        writer.writerow(['Field', 'Value'])
        writer.writerow(['ID', student.id])
        writer.writerow(['Name', student.name])
        writer.writerow(['USN', student.usn])
        writer.writerow(['Semester', student.semester])
        writer.writerow(['Attendance (%)', student.attendance])
        writer.writerow(['Study Hours', student.study_hours])
        writer.writerow(['IAT Marks', student.iat_marks])
        writer.writerow(['Assignments', student.assignments])
        writer.writerow(['Extra Curricular', student.extra_curricular])
        writer.writerow(['Current Prediction', student.prediction or 'N/A'])
        writer.writerow(['Consistency Rating', student.consistency_rating or 'N/A'])
        writer.writerow(['Predicted Grade', student.predicted_grade or 'N/A'])
        writer.writerow([])
        
        # Write prediction history
        writer.writerow(['PREDICTION HISTORY'])
        writer.writerow(['ID', 'Attendance', 'Study Hours', 'IAT Marks', 'Assignments', 'Activities', 'Prediction', 'Date'])
        
        for pred in predictions:
            writer.writerow([
                pred.id,
                pred.attendance,
                pred.study_hours,
                pred.internal_marks,
                pred.assignments,
                pred.activities,
                pred.prediction,
                pred.created_at.strftime('%Y-%m-%d %H:%M:%S') if pred.created_at else 'N/A'
            ])
        
        # Prepare file for download
        output.seek(0)
        
        return send_file(
            io.BytesIO(output.getvalue().encode('utf-8')),
            mimetype='text/csv',
            as_attachment=True,
            download_name=f'student_{student.usn}_{datetime.now().strftime("%Y%m%d")}.csv'
        )
    
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500


# ---------------------------
# DOWNLOAD STUDENT DATA AS JSON
# ---------------------------
@download.get("/download/student/<int:student_id>/json")
def download_student_json(student_id):
    """Download student data and prediction history as JSON"""
    try:
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({'message': 'Student not found'}), 404
        
        # Get prediction history
        predictions = Prediction.query.filter_by(student_id=student_id).all()
        
        # Prepare data
        data = {
            'student_info': {
                'id': student.id,
                'user_id': student.user_id,
                'name': student.name,
                'usn': student.usn,
                'semester': student.semester,
                'attendance': student.attendance,
                'study_hours': student.study_hours,
                'iat_marks': student.iat_marks,
                'assignments': student.assignments,
                'extra_curricular': student.extra_curricular,
                'prediction': student.prediction,
                'consistency_rating': student.consistency_rating,
                'predicted_grade': student.predicted_grade
            },
            'prediction_history': [
                {
                    'id': pred.id,
                    'attendance': pred.attendance,
                    'study_hours': pred.study_hours,
                    'internal_marks': pred.internal_marks,
                    'assignments': pred.assignments,
                    'activities': pred.activities,
                    'prediction': pred.prediction,
                    'created_at': pred.created_at.strftime('%Y-%m-%d %H:%M:%S') if pred.created_at else None
                }
                for pred in predictions
            ],
            'download_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'total_predictions': len(predictions)
        }
        
        # Create JSON file
        json_str = json.dumps(data, indent=2)
        
        return send_file(
            io.BytesIO(json_str.encode('utf-8')),
            mimetype='application/json',
            as_attachment=True,
            download_name=f'student_{student.usn}_{datetime.now().strftime("%Y%m%d")}.json'
        )
    
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500


# ---------------------------
# DOWNLOAD STUDENT REPORT (Formatted)
# ---------------------------
@download.get("/download/student/<int:student_id>/report")
def download_student_report(student_id):
    """Download formatted student report as text file"""
    try:
        student = Student.query.get(student_id)
        
        if not student:
            return jsonify({'message': 'Student not found'}), 404
        
        # Get prediction history
        predictions = Prediction.query.filter_by(student_id=student_id).all()
        
        # Create report
        report = []
        report.append("=" * 60)
        report.append("STUDENT PERFORMANCE REPORT")
        report.append("=" * 60)
        report.append("")
        report.append(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        report.append("")
        report.append("-" * 60)
        report.append("STUDENT INFORMATION")
        report.append("-" * 60)
        report.append(f"Name:                 {student.name}")
        report.append(f"USN:                  {student.usn}")
        report.append(f"Semester:             {student.semester}")
        report.append(f"Attendance:           {student.attendance}%")
        report.append(f"Study Hours:          {student.study_hours} hrs/day")
        report.append(f"IAT Marks:            {student.iat_marks}")
        report.append(f"Assignments:          {student.assignments}")
        report.append(f"Extra Curricular:     {student.extra_curricular}")
        report.append("")
        report.append(f"Current Prediction:   {student.prediction or 'N/A'}")
        report.append(f"Consistency Rating:   {student.consistency_rating or 'N/A'}")
        report.append(f"Predicted Grade:      {student.predicted_grade or 'N/A'}")
        report.append("")
        report.append("-" * 60)
        report.append(f"PREDICTION HISTORY ({len(predictions)} records)")
        report.append("-" * 60)
        
        if predictions:
            for i, pred in enumerate(predictions, 1):
                report.append(f"\n{i}. Prediction on {pred.created_at.strftime('%Y-%m-%d %H:%M') if pred.created_at else 'N/A'}")
                report.append(f"   Attendance: {pred.attendance}% | Study Hours: {pred.study_hours}")
                report.append(f"   IAT Marks: {pred.internal_marks} | Assignments: {pred.assignments}")
                report.append(f"   Activities: {pred.activities} | Result: {pred.prediction}")
        else:
            report.append("\nNo prediction history available.")
        
        report.append("\n" + "=" * 60)
        report.append("END OF REPORT")
        report.append("=" * 60)
        
        # Join report lines
        report_text = "\n".join(report)
        
        return send_file(
            io.BytesIO(report_text.encode('utf-8')),
            mimetype='text/plain',
            as_attachment=True,
            download_name=f'student_report_{student.usn}_{datetime.now().strftime("%Y%m%d")}.txt'
        )
    
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 500
