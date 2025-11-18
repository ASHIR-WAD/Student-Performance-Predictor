from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()

# ---------------------------
# USER MODEL
# ---------------------------
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False, index=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)        # teacher / student
    

    # Teacher → Students
    students = db.relationship("Student", back_populates="teacher", cascade="all, delete")


# ---------------------------
# FACULTY MODEL
# ---------------------------
class Faculty(db.Model):
    __tablename__ = "faculty"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True)
    faculty_user = db.relationship("User")
    
    name = db.Column(db.String(100), nullable=False)
    designation = db.Column(db.String(50), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)


# ---------------------------
# STUDENT MODEL
# ---------------------------
class Student(db.Model):
    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)

    # Student login account
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True)
    student_user = db.relationship("User")

    name = db.Column(db.String(50), nullable=False)
    usn = db.Column(db.String(20), unique=True, nullable=False)
    semester = db.Column(db.String(50), nullable=False)
    attendance = db.Column(db.Float, nullable=False)
    study_hours = db.Column(db.Float, nullable=False)
    iat_marks = db.Column(db.Float, nullable=False)
    assignments = db.Column(db.Integer, nullable=False)
    extra_curricular = db.Column(db.Integer, nullable=True)

    prediction = db.Column(db.String(50))
    consistency_rating = db.Column(db.Float, nullable=True)
    predicted_grade = db.Column(db.String(10), nullable=True)


    # def to_dict(self):
    #     """Convert student to dictionary"""
    #     return {
    #         "id": self.id,
    #         "teacher_id": self.teacher_id,
    #         "user_id": self.user_id,
    #         "name": self.name,
    #         "student_class": self.student_class,
    #         "created_at": self.created_at.isoformat() if self.created_at else None
    #     }


if __name__ == '__main__':
        db.create_all()
