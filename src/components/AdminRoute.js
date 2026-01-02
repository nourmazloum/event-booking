import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

function AdminRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/signup" replace />;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
