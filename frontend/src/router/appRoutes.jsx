import { Routes, Route } from "react-router-dom";
import FeedPage from "../pages/feedPage";
import SigninPage from "../pages/signinPage";
import SignupPage from "../pages/signupPage";
import AppLayout from "../layouts/appLayout";
import GuestLayout from "../layouts/guestLayout";

export default function appRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<FeedPage />} />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/sign-in" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Route>
      </Routes>
    </>
  );
}
