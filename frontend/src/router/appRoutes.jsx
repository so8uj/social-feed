import { Routes, Route } from "react-router-dom";
import FeedPage from "../pages/FeedPage";
import SigninPage from "../pages/SigninPage";
import SignupPage from "../pages/SignupPage";
import AppLayout from "../layouts/AppLayout";
import GuestLayout from "../layouts/GuestLayout";
import GuestRoutes from "./GuestRoutes";

import ProtectedRoutes from "./ProtectedRoutes";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<FeedPage />} />
          </Route>
        </Route>
        <Route element={<GuestRoutes />}>
          <Route element={<GuestLayout />}>
            <Route path="/sign-in" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
