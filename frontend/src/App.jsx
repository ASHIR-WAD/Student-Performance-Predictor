import { Routes, Route } from "react-router-dom";


import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import StudentDashboard from "./pages/StudentDashboard" ;
import FacultyDashboard from "./pages/FacultyDashboard";
import SubmitDataPage from "./pages/SubmitDataPage";
// import RoleRoute from "./auth/RoleRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard/>} />
      <Route path="/submit-data" element={<SubmitDataPage />} />
    </Routes>
  );
}
