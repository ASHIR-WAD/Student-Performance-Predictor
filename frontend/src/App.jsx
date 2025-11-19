import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/dashboard/StudentDashboard";

import FacultyDashboard from "./pages/dashboard/FacultyDashboard";
import RoleRoute from "./auth/RoleRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      
      <Route
  path="/faculty-dashboard"
  element={
    <RoleRoute role="faculty">
      <FacultyDashboard />
    </RoleRoute>
  }
/>
<Route
  path="/student-dashboard"
  element={
    <RoleRoute role="student">
      <StudentDashboard />
    </RoleRoute>
  }
/>

    </Routes>
  );
}
