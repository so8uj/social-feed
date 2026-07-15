import AppRoutes from "./router/AppRoutes";

import "./assets/css/bootstrap.min.css";
import "./assets/css/common.css";
import "./assets/css/main.css";
import "./assets/css/responsive.css";
import "./assets/css/custom.css";
import { AuthProvider } from "./context/AuthContext";
import { FeedProvider } from "./context/FeedContext";

export default function App() {
  return (
    <AuthProvider>
      <FeedProvider>
        <AppRoutes />
      </FeedProvider>
    </AuthProvider>
  );
}
