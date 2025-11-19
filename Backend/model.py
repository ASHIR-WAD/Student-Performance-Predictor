from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# ---------------------------
# USER MODEL (teachers & student accounts)
# ---------------------------
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'teacher' or 'student'

    # If this user is a student, the Student row pointing to this account (one-to-one)
    student_profile = db.relationship(
        "Student",
        back_populates="student_user",
        uselist=False,
        foreign_keys="Student.user_id"
    )

    

# ---------------------------
# FACULTY MODEL (meta for users who are faculty)
# ---------------------------
class Faculty(db.Model):
    __tablename__ = "faculty"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True)
    faculty_user = db.relationship("User", backref=db.backref("faculty_profile", uselist=False))

    name = db.Column(db.String(100), nullable=False)
    designation = db.Column(db.String(50), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)


# ---------------------------
# STUDENT MODEL (no teacher connection)
# ---------------------------
class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)

    # Optional link to a login User account for this student (no teacher FK)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True, nullable=True)
    student_user = db.relationship("User", back_populates="student_profile", foreign_keys=[user_id])

    # Profile fields
    name = db.Column(db.String(50), nullable=False)
    usn = db.Column(db.String(20), unique=True, nullable=False)
    semester = db.Column(db.String(50), nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationship to predictions (one-to-many)
    predictions = db.relationship(
        "Prediction",
        back_populates="student",
        cascade="all, delete-orphan",
        order_by="desc(Prediction.created_at)"
    )



# ---------------------------
# PREDICTION MODEL (many predictions per student)
# ---------------------------
class Prediction(db.Model):
    __tablename__ = "predictions"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False, index=True)
    student = db.relationship("Student", back_populates="predictions")

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    attendance = db.Column(db.Float, nullable=True)
    study_hours = db.Column(db.Float, nullable=True)
    iat_marks = db.Column(db.Float, nullable=True)
    assignments = db.Column(db.Integer, nullable=True)
    extra_curricular = db.Column(db.Integer, nullable=True)
    consistency_rating = db.Column(db.Float, nullable=True)

    predicted_grade = db.Column(db.String(10), nullable=True)
    prediction = db.Column(db.String(512), nullable=True)
    confidence_level = db.Column(db.String(512), nullable=True)



if __name__ == '__main__':
    db.create_all()
