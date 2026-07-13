import AppRoutes from "./router/appRoutes";

import "./assets/css/bootstrap.min.css";
import "./assets/css/common.css";
import "./assets/css/main.css";
import "./assets/css/responsive.css";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
