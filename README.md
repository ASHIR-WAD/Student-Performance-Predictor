# 🎓 Student Performance Predictor    

A lightweight machine-learning-powered system designed to predict student academic performance using key indicators like attendance, internal marks, study hours, and consistency. Built during a hackathon by the team at CMR Institute of Technology, Bengaluru.

### Project Board Link : https://github.com/ASHIR-WAD/Student-Performance-Predictor
---

## ✨ Features

- 📊 *Performance Prediction*: Predicts whether a student is likely to perform well or may need academic support.  
- ⚙ *Random Forest Classifier*: Robust and interpretable ML model using Python / scikit-learn.  
- 🧹 *Data Pipeline*: Clean preprocessing, encoding, scaling, and train/test splitting.  
- 🌐 *Web UI*: Responsive frontend for entering student data and receiving instant predictions.  
- 📝 *Key Indicators*: Attendance, study hours, internals, assignments, extracurriculars and consistency metrics.  
- 📈 *Insights*: Helps educators and institutions identify at-risk students early.

---

## 🏗 System Architecture

User → Web UI (HTML/CSS/JS)
↓
Backend API (Python/Flask)
↓
ML Model (Random Forest)
↓
Prediction + Academic Support Insights

---

## 🚀 Quick Start

### 1. Clone the repository  
```bash
git clone https://github.com/ASHIR-WAD/Student-Performance-Predictor.git
cd Student-Performance-Predictor

2. Install dependencies

pip install -r requirements.txt

3. Run the backend

python app.py

4. Visit the UI

Open your browser at http://localhost:5000 and enter student details to get predictions.

5. now run the frontend 

cd frontend
npm i
npm run dev
---

🧠 Machine Learning

Dataset Overview

Attendance

Study Hours

Internal Assessment Marks

Assignments / Projects

Extracurricular Activity

Consistency Rating

Student Outcome (target variable)


Model Details

Algorithm: Random Forest Classifier

Accuracy: ~85–92% (depending on train/test split)

Model saved as model.pkl and served via the backend.

🛠 Tech Stack

Backend: Python (Flask)

ML: scikit-learn, Pandas, NumPy

Frontend: HTML, CSS, JavaScript

Deployment: Lightweight, hackathon-ready



---

🧪 Future Enhancements

📈 Integrate dashboards for analytics and visualizations

☁ Deploy to cloud platforms (Heroku, Render, etc.)

🔐 Add authentication & roles (Admin, Instructor, Student)

🧠 Explore deep-learning models for higher prediction accuracy

🔗 Integrate with ERP systems for automatic data ingestion



---

👥 Contributors

Ashirwad (1CR23CD011)

Aditya Mule (1CR23CD036)

C Vishwak Sena (1CR23CD017)
