import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) return <Navigate to="/login" replace />;

  if (user.userType !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}