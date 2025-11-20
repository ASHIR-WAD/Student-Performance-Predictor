from flask import Blueprint, jsonify, send_file
from model import Student, Prediction, db
import csv
import json
import io
from datetime import datetime

download = Blueprint("download", __name__,url_prefix="/download")

from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from collections import OrderedDict


@download.route("/pdf", methods=["GET"])
def download_all_predictions_pdf():
    # 1) Query BOTH Student and Prediction explicitly
    results = (
        db.session.query(Student, Prediction)
        .join(Prediction, Prediction.student_id == Student.id)  # adjust if your FK is different
        .order_by(Student.name.asc(), Prediction.created_at.asc())
        .all()
    )

    if not results:
        return jsonify({"error": "No predictions found"}), 404

    # 2) Group predictions by student
    students_map = OrderedDict()
    for stu, pred in results:
        if stu.id not in students_map:
            students_map[stu.id] = {
                "student": stu,
                "predictions": []
            }
        students_map[stu.id]["predictions"].append(pred)

    # 3) Prepare PDF
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    headers = ["Predicted Grade", "Prediction", "Confidence", "Created At"]
    col_x = [2 * cm, 6 * cm, 10 * cm, 13 * cm]

    for idx, (stu_id, entry) in enumerate(students_map.items()):
        student = entry["student"]
        preds = entry["predictions"]

        # New page per student (except first)
        if idx > 0:
            p.showPage()

        y = height - 2 * cm

        # Student header
        p.setFont("Helvetica-Bold", 16)
        p.drawString(2 * cm, y, f"Prediction Report - {student.name}")
        y -= 1 * cm

        p.setFont("Helvetica", 12)
        p.drawString(2 * cm, y, f"USN: {student.usn}")
        y -= 1 * cm

        # Table header
        p.setFont("Helvetica-Bold", 11)
        for i, h in enumerate(headers):
            p.drawString(col_x[i], y, h)
        y -= 0.7 * cm

        # Table rows
        p.setFont("Helvetica", 10)
        for pred in preds:
            if y < 2 * cm:
                p.showPage()
                y = height - 2 * cm

                p.setFont("Helvetica-Bold", 14)
                p.drawString(2 * cm, y, f"{student.name} ({student.usn}) - continued")
                y -= 1 * cm

                p.setFont("Helvetica-Bold", 11)
                for i, h in enumerate(headers):
                    p.drawString(col_x[i], y, h)
                y -= 0.7 * cm
                p.setFont("Helvetica", 10)

            created_at_str = pred.created_at.strftime("%Y-%m-%d %H:%M") if pred.created_at else ""

            p.drawString(col_x[0], y, str(pred.predicted_grade))
            p.drawString(col_x[1], y, str(pred.prediction))
            # if confidence_level is already like "92%", remove extra '%'
            conf_val = str(pred.confidence_level)
            if not conf_val.endswith("%"):
                conf_val = f"{conf_val}%"
            p.drawString(col_x[2], y, conf_val)
            p.drawString(col_x[3], y, created_at_str)

            y -= 0.6 * cm

    # 4) Finalize PDF
    p.showPage()
    p.save()
    buffer.seek(0)

    return send_file(
        buffer,
        as_attachment=True,
        download_name="all_students_predictions.pdf",
        mimetype="application/pdf",
    )