import { Outlet, Navigate } from "react-router";

export default function guestRoutes() {
  const isLoggedIn = localStorage.getItem("token");
  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
