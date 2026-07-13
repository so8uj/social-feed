import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute() {
  const { authenticated } = useAuth();

  return authenticated ? <Navigate to="/" replace /> : <Outlet />;
}
