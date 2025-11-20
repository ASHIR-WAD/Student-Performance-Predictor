# 🚀 Sprint Backlog 
**Duration:** 18 Nov – 20 Nov 2025  
**Project:** Student Performance Predictor  


---

## 🎯 Sprint Goal
Deliver a complete prediction workflow including data submission, ML model integration, database storage, UI dashboard, and export features.

---

## 📌 User Stories & Tasks (Combined Overview)

### 🧩 1. Prediction API
| Story | Priority | Tasks | Status |
|-------|----------|--------|--------|
| As a student, I want to submit data and receive predictions | High | Build `/predict` API | ✅ Done |
| | | Add backend validation | ✅ Done |
| | | Fix NoneType issues | 🔄 In Progress |

---

### 🗄️ 2. Database Integration
| Story | Priority | Tasks | Status |
|-------|----------|--------|--------|
| As faculty, I want predictions stored properly | High | Create `Prediction` model | ✅ Done |
| | | Join Students + Predictions | ⏳ To Do |
| | | Add DB commit logic | 🔄 In Progress |

---

### 🖥️ 3. Faculty Dashboard
| Story | Priority | Tasks | Status |
|-------|----------|--------|--------|
| As faculty, I want a clear dashboard | Medium | Build data tables | 🔄 In Progress |
| | | Add icons, colors, and datatypes | ⏳ To Do |
| | | Fix relationship rendering | 🔄 In Progress |

---

### 📄 4. PDF Export Feature
| Story | Priority | Tasks | Status |
|-------|----------|--------|--------|
| As faculty, I want to download reports | Medium | Build PDF generator | ⏳ To Do |
| | | Fix CORS issues | 🔄 In Progress |

---


## 🔍 Notes
- API pipeline is complete.
- Dashboard requires UI polishing and proper rendering of joined data.
- PDF export fixed CORS + formatting issues.

---


