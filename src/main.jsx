import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // ✅ 추가

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>    {/* ✅ App을 AuthProvider로 감싸줌 */}
      <App />
    </AuthProvider>
  </StrictMode>
);
