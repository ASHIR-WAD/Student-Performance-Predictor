from flask import Flask, jsonify
from flask_cors import CORS
from model import db,Student,User,Faculty
import os
from datetime import datetime



app = Flask(__name__)

# Configuration
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL", "sqlite:///student_perf.sqlite3")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# CORS Configuration - restrict in production
CORS(app)




db.init_app(app)

# # Register route blueprints
# app.register_blueprint(login)
# app.register_blueprint(students)

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



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("Database initialized")
    
    port = int(os.getenv("PORT", 6969))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    
    app.run(debug=debug, port=port, host="0.0.0.0")
