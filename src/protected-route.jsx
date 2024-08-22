import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem("userData");

  if (!userData) {
    // Redirect to /auth/login if userData is not present
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children; // Render the child component if userData exists
};

export default ProtectedRoute;
