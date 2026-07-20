import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import TestPage from "../pages/Test";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/test" element={<TestPage />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
