import { Navigate } from "react-router-dom";
import { getToken } from "@/lib/auth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!getToken()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
