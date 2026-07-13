import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { authenticated } = useAuth();

  return authenticated ? <Outlet /> : <Navigate to="/sign-in" replace />;
}
