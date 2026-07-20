import { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../components/ui/button";
import { getInitials } from "@/utils/string";
import { getGreeting } from "@/utils/greeting";
import { getMonthLabel } from "@/utils/date";

export function DashboardPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());

  const firstName = user?.user_metadata?.name?.split(" ")[0] ?? "Usuário";
  const initials = getInitials(user?.user_metadata?.name ?? "U");
  const greeting = getGreeting();
  const monthLabel = getMonthLabel(currentDate);

  function prevMonth() {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  }

  function nextMonth() {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  }

  return (
    <>
      <header className="topbar">
        <div className="mobile-brand">Finly</div>
        <div className="month-picker">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={prevMonth}
            className="icon-button"
          >
            <ChevronLeft size={18} />
          </Button>
          <span>{monthLabel}</span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={nextMonth}
            className="icon-button"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
        <div className="top-actions">
          <Button variant="ghost" size="icon" className="icon-button">
            <Bell size={19} />
          </Button>
          <div className="profile">
            <div className="avatar small">{initials}</div>
            <span>Olá, {firstName}</span>
            <ChevronDown size={15} />
          </div>
        </div>
      </header>

      <div className="page-heading">
        <div>
          <p className="eyebrow">VISÃO GERAL</p>
          <h1>
            {greeting}, {firstName} <span>✦</span>
          </h1>
          <p>Acompanhe sua vida financeira de um jeito simples.</p>
        </div>
        <Button className="add-button">
          <Plus size={19} /> Nova transação
        </Button>
      </div>
    </>
  );
}
