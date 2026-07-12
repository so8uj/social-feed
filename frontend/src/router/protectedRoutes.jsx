import { Outlet, Navigate } from "react-router";

export default function protectedRoutes() {
  const isLoggedIn = localStorage.getItem("token") || false;
  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
