import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../pages/Dashboard";
import { SettingsPage } from "../pages/Settings";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
