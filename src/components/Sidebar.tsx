import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, ReceiptText, Settings } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";
import { getInitials } from "@/utils/string";

const navItems = [
  { label: "Visão geral", icon: LayoutDashboard, path: "/" },
  { label: "Transações", icon: ReceiptText, path: "/transactions" },
  { label: "Configurações", icon: Settings, path: "/settings" },
] as const;

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const userName = user?.user_metadata?.name ?? "Usuário";
  const initials = getInitials(userName);

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-dot">F.</span>
        <span>Finly</span>
      </div>

      <nav>
        {navItems.map(({ label, icon: Icon, path }) => (
          <Button
            key={path}
            variant="ghost"
            onClick={() => navigate(path)}
            className={
              location.pathname === path ? "nav-item active" : "nav-item"
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </Button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <div className="avatar">{initials}</div>
          <span className="sidebar-user-name">{userName}</span>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={logout}
          title="Sair da conta"
          className="rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut size={16} />
        </Button>
      </div>
    </aside>
  );
}
