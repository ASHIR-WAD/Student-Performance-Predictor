import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.ensemble import (
    RandomForestClassifier,
    GradientBoostingClassifier,
    RandomForestRegressor,
    GradientBoostingRegressor,
)
from sklearn.svm import SVC, SVR

from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    mean_absolute_error, mean_squared_error, r2_score
)

import joblib
import os

print("🔧 Training ML models in backend environment…")

# ------------------------------------------------------
# LOAD YOUR DATASET
# ------------------------------------------------------
df = pd.read_csv("dataset.csv")  # <-- change this to your actual file name

# Auto-detect target columns (same logic as notebook)
cols_lower = {c.lower(): c for c in df.columns}

def find_col(text):
    for c in df.columns:
        if all(t in c.lower() for t in text):
            return c
    return None

grade_col = find_col(["predicted", "grade"])
conf_col = find_col(["confidence"])
predictor_col = find_col(["predictor"]) or find_col(["pass"])

target_cols = [grade_col, conf_col, predictor_col]

print("Targets detected:", target_cols)

# ------------------------------------------------------
# FEATURES / PREPROCESSOR
# ------------------------------------------------------
X = df.drop(columns=target_cols)

num_cols = X.select_dtypes(include=[np.number]).columns.tolist()
cat_cols = X.select_dtypes(exclude=[np.number]).columns.tolist()

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), num_cols),
        ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
    ]
)

# ------------------------------------------------------
# TRAIN FUNCTION
# ------------------------------------------------------
def train_best_model(target):
    y = df[target]

    # Determine classification vs regression
    is_numeric = np.issubdtype(y.dtype, np.number)
    problem = "regression" if (is_numeric and y.nunique() > 10) else "classification"

    print(f"\n🎯 Training: {target}  ({problem})")

    if problem == "classification":
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, stratify=y, random_state=42
        )
        models = {
            "LogisticRegression": LogisticRegression(max_iter=1000),
            "RandomForest": RandomForestClassifier(n_estimators=250, random_state=42),
            "GradientBoosting": GradientBoostingClassifier(random_state=42),
            "SVC": SVC(probability=True),
        }
    else:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        models = {
            "LinearRegression": LinearRegression(),
            "RFRegressor": RandomForestRegressor(n_estimators=250, random_state=42),
            "GBRegressor": GradientBoostingRegressor(random_state=42),
            "SVR": SVR(),
        }

    best_score = -999
    best_model = None
    best_name = None

    # Train each model inside a pipeline
    for name, mdl in models.items():
        pipe = Pipeline([("prep", preprocessor), ("model", mdl)])
        pipe.fit(X_train, y_train)
        pred = pipe.predict(X_test)

        if problem == "classification":
            score = f1_score(y_test, pred, average="weighted")
        else:
            score = r2_score(y_test, pred)

        print(f"   {name} → Score = {score:.4f}")

        if score > best_score:
            best_score = score
            best_model = pipe
            best_name = name

    print(f"🏆 Best for {target}: {best_name} ({best_score:.4f})")
    return best_model


# ------------------------------------------------------
# TRAIN ALL THREE MODELS
# ------------------------------------------------------
models = {
    "grade": train_best_model(grade_col),
    "confidence": train_best_model(conf_col),
    "predictor": train_best_model(predictor_col),
}

# ------------------------------------------------------
# SAVE MODELS TO Backend/model/
# ------------------------------------------------------
os.makedirs("model", exist_ok=True)

joblib.dump(models["grade"], "model/best_model_predicted_grade.pkl")
joblib.dump(models["confidence"], "model/best_model_confidence_level.pkl")
joblib.dump(models["predictor"], "model/best_model_predictor.pkl")

print("\n🎉 ALL MODELS TRAINED & SAVED SUCCESSFULLY!")
