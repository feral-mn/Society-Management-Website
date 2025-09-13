import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();
  console.log("user:", user);
  console.log("role:", role);
  console.log("allowedRoles:", allowedRoles);

  if (loading) return <p>Loading...</p>;

  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
