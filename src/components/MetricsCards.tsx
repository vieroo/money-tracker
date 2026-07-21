import { ArrowDownRight, ArrowUpRight, CalendarDays } from "lucide-react";
import type { Transaction } from "@/types/transaction";
import { formatBRL } from "@/utils/string";

interface MetricsCardsProps {
  transactions: Transaction[];
  currentDate: Date;
}

export function MetricsCards({ transactions, currentDate }: MetricsCardsProps) {
  const selectedYear = currentDate.getFullYear();
  const selectedMonth = currentDate.getMonth();

  const monthTransactions = transactions.filter((t) => {
    if (!t.date) return false;
    const [yearStr, monthStr] = t.date.split("-");
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    return year === selectedYear && month === selectedMonth;
  });

  const incomeTransactions = monthTransactions.filter(
    (t) => t.type === "INCOME",
  );
  const expenseTransactions = monthTransactions.filter(
    (t) => t.type === "EXPENSE",
  );

  const monthlyIncome = incomeTransactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0,
  );
  const monthlyExpenses = expenseTransactions.reduce(
    (sum, t) => sum + Number(t.amount),
    0,
  );

  const now = new Date();
  const isCurrentMonth =
    now.getFullYear() === selectedYear && now.getMonth() === selectedMonth;
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const daysCount = isCurrentMonth ? Math.max(1, now.getDate()) : daysInMonth;

  const dailyAverage = daysCount > 0 ? monthlyExpenses / daysCount : 0;

  const incomeNote =
    incomeTransactions.length > 0
      ? `${incomeTransactions.length} entrada${incomeTransactions.length > 1 ? "s" : ""} no mês`
      : "Nenhuma entrada no mês";

  const expenseNote =
    monthlyIncome > 0
      ? `${Math.round((monthlyExpenses / monthlyIncome) * 100)}% da sua receita`
      : `${expenseTransactions.length} saída${expenseTransactions.length > 1 ? "s" : ""} no mês`;

  const dailyNote = `Baseado em ${daysCount} dia${daysCount > 1 ? "s" : ""}`;

  return (
    <section className="metrics-grid">
      <article className="metric-card">
        <div className="metric-icon lime">
          <ArrowUpRight size={19} />
        </div>
        <p>Entradas do mês</p>
        <strong>{formatBRL(monthlyIncome)}</strong>
        <span>{incomeNote}</span>
      </article>

      <article className="metric-card">
        <div className="metric-icon pink">
          <ArrowDownRight size={19} />
        </div>
        <p>Gastos do mês</p>
        <strong>{formatBRL(monthlyExpenses)}</strong>
        <span>{expenseNote}</span>
      </article>

      <article className="metric-card">
        <div className="metric-icon black">
          <CalendarDays size={19} />
        </div>
        <p>Média diária</p>
        <strong>{formatBRL(dailyAverage)}</strong>
        <span>{dailyNote}</span>
      </article>
    </section>
  );
}
