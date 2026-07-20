import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function AppLayout() {
  return (
    <main className="app-shell">
      <Sidebar />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
}
