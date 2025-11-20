# 🔄 Sprint Retrospective 
**Date:** 20 Nov 2025  
**Project:** Student Performance Predictor  


---

## ⭐ What Went Well
- ML prediction model integrated smoothly with Flask backend  
- Frontend React components improved the student dashboard UI  
- Debugging logs helped quickly identify the NoneType and datatype issues  
- API endpoints structured cleanly and organized  
- Agile documentation (standups, backlog) properly structured and created

---

## ⚠️ What Didn’t Go Well
- SQLAlchemy relationship syntax errors slowed backend progress  
- Several model responses still returned `NoneType`, causing crashes  
- PDF generation faced CORS + formatting issues  
- Dashboard formatting and icon styling took longer than expected  
- React router conflicts affected logout navigation

---

## 💡 Action Items (Improvements for Next Sprint)
| Improvement |  Target Sprint |
|------------|--------|----------------|
| Add strict input sanitization in `/predict` | Sprint 3 |
| Rework SQLAlchemy relationships | Sprint 3 |
| Implement consistent datatype formatting | Sprint 3 |
| Complete PDF export + fix CORS | Sprint 3 |
| Improve dashboard UI with colors & icons | Sprint 3 |

---

## 🎯 Focus Areas for Next Sprint
- Finalize full prediction pipeline: **Submit → Predict → Save → Visualize → Export PDF**  
- Complete faculty dashboard (tables, colors, icons, relationship data)  
- Clean, stable backend with consistent datatype formatting  
- UI/UX refinement for student + faculty portals

---

## 💭 Team Reflection
The sprint was productive but slowed down by model and relationship errors. With stronger API consistency and structured UI improvements, next sprint delivery will be smoother and faster.
