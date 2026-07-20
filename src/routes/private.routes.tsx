import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../pages/Dashboard";
import { SettingsPage } from "../pages/Settings";
import { AppLayout } from "../layouts/AppLayout";
import TestPage from "../pages/Test";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/test" element={<TestPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

