# Student Performance Predictor - Backend

## Structure

```
Backend/
├── app.py                    # Main Flask application
├── database.py               # Database initialization
├── models.py                 # SQLAlchemy models (User, Student)
├── routes/
│   ├── auth_routes.py       # Authentication endpoints
│   ├── predict_routes.py    # Prediction endpoints
│   └── student_routes.py    # Student CRUD endpoints
├── requirements.txt          # Python dependencies
├── predictor_model.pkl      # Trained ML model (to be generated)
└── .env                      # Environment variables (create from .env.example)
```

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your SECRET_KEY

3. **Train and save the model:**
   Run the ML notebook to generate `predictor_model.pkl`

4. **Run the application:**
   ```bash
   python app.py
   ```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/verify` - Verify token validity
- `GET /api/auth/me` - Get current user info

### Students (`/api/students`)
- `GET /api/students/` - Get all students
- `GET /api/students/<id>` - Get specific student
- `POST /api/students/` - Create new student
- `PUT /api/students/<id>` - Update student
- `DELETE /api/students/<id>` - Delete student
- `GET /api/students/search?q=<query>` - Search students
- `GET /api/students/statistics` - Get statistics

### Predictions (`/api/predict`)
- `POST /api/predict/performance` - Predict single student performance
- `POST /api/predict/batch` - Batch predictions
- `GET /api/predict/model-info` - Get model information

## Authentication

All endpoints (except `/api/auth/register` and `/api/auth/login`) require JWT authentication.

Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Example Requests

### Register
```bash
curl -X POST http://localhost:6969/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:6969/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Predict Performance
```bash
curl -X POST http://localhost:6969/api/predict/performance \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"study_hours":5,"attendance":85,"previous_grade":75,"extracurricular":true}'
```
