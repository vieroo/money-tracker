import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  MoreHorizontal,
  PieChart,
  Plus,
  ReceiptText,
  Settings,
  ShoppingBag,
  Sparkles,
  Utensils,
  WalletCards,
  X,
} from "lucide-react";

type TransactionType = "INCOME" | "EXPENSE";
type TransactionMode = "SINGLE" | "INSTALLMENT" | "RECURRING";
type Transaction = {
  id: number | string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
  mode: TransactionMode;
  date: string;
  currentInstallment?: number;
  totalInstallments?: number;
};

const transactions: Transaction[] = [
  {
    id: 1,
    description: "Salário",
    category: "Salário",
    amount: 6200,
    type: "INCOME",
    mode: "RECURRING",
    date: "2026-07-05",
  },
  {
    id: 2,
    description: "Mercado Verde",
    category: "Mercado",
    amount: 328.4,
    type: "EXPENSE",
    mode: "SINGLE",
    date: "2026-07-16",
  },
  {
    id: 3,
    description: "iFood",
    category: "Restaurante",
    amount: 64.9,
    type: "EXPENSE",
    mode: "SINGLE",
    date: "2026-07-15",
  },
  {
    id: 4,
    description: "Notebook",
    category: "Compras",
    amount: 420,
    type: "EXPENSE",
    mode: "INSTALLMENT",
    date: "2026-07-10",
    currentInstallment: 3,
    totalInstallments: 10,
  },
  {
    id: 5,
    description: "Netflix",
    category: "Assinaturas",
    amount: 39.9,
    type: "EXPENSE",
    mode: "RECURRING",
    date: "2026-07-08",
  },
  {
    id: 6,
    description: "Freelance",
    category: "Freelance",
    amount: 850,
    type: "INCOME",
    mode: "SINGLE",
    date: "2026-07-03",
  },
];

const categories = [
  "Alimentação",
  "Mercado",
  "Restaurante",
  "Transporte",
  "Moradia",
  "Saúde",
  "Compras",
  "Assinaturas",
  "Lazer",
  "Salário",
  "Freelance",
  "Outros",
];
const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(
    new Date(`${date}T12:00:00`),
  );

// --- Static pre-computed metrics ---
const expenses = transactions
  .filter((t) => t.type === "EXPENSE")
  .reduce((sum, t) => sum + t.amount, 0);
const income = transactions
  .filter((t) => t.type === "INCOME")
  .reduce((sum, t) => sum + t.amount, 0);
const future = transactions
  .filter(
    (t) =>
      t.mode === "INSTALLMENT" &&
      (t.currentInstallment ?? 0) < (t.totalInstallments ?? 0),
  )
  .reduce(
    (sum, t) =>
      sum +
      t.amount * ((t.totalInstallments ?? 0) - (t.currentInstallment ?? 0)),
    0,
  );
const metrics = {
  expenses,
  income,
  balance: income - expenses,
  daily: expenses / 17,
  future,
};

function TestPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Visão geral");
  const [showBalance, setShowBalance] = useState(true);

  const nav = [
    ["Visão geral", LayoutDashboard],
    ["Transações", ReceiptText],
    ["Planejamento", PieChart],
    ["Cartões", CreditCard],
    ["Configurações", Settings],
  ] as const;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-dot">F.</span>
          <span>Finly</span>
        </div>
        <nav>
          {nav.map(([label, Icon]) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={activeNav === label ? "nav-item active" : "nav-item"}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="help-button">?</button>
          <div className="avatar">TV</div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="mobile-brand">Finly</div>
          <div className="month-picker">
            <ChevronLeft size={18} />
            <span>Julho de 2026</span>
            <ChevronDown size={16} />
            <ChevronRight size={18} />
          </div>
          <div className="top-actions">
            <button className="icon-button">
              <Bell size={19} />
            </button>
            <div className="profile">
              <div className="avatar small">TV</div>
              <span>Olá, Terry</span>
              <ChevronDown size={15} />
            </div>
          </div>
        </header>

        <div className="page-heading">
          <div>
            <p className="eyebrow">VISÃO GERAL</p>
            <h1>
              Bom dia, Terry <span>✦</span>
            </h1>
            <p>Acompanhe sua vida financeira de um jeito simples.</p>
          </div>
          <button className="add-button" onClick={() => setModalOpen(true)}>
            <Plus size={19} /> Nova transação
          </button>
        </div>

        <section className="balance-grid">
          <article className="balance-card">
            <div className="card-label">
              SALDO ATUAL{" "}
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="visibility"
              >
                {showBalance ? "◉" : "○"}
              </button>
            </div>
            <strong>
              {showBalance ? money.format(metrics.balance) : "••••••"}
            </strong>
            <p>
              <span className="balance-dot" /> Atualizado agora
            </p>
            <div className="balance-actions">
              <button
                className="dark-action"
                onClick={() => setModalOpen(true)}
              >
                <Plus size={16} /> Adicionar
              </button>
              <button className="soft-action">
                Transferir <ArrowUpRight size={15} />
              </button>
            </div>
          </article>
          <article className="quick-card" onClick={() => setModalOpen(true)}>
            <div className="quick-icon">
              <Sparkles size={22} />
            </div>
            <div>
              <h3>Registro rápido</h3>
              <p>Adicione uma entrada ou saída em segundos.</p>
            </div>
            <ChevronRight className="quick-arrow" />
          </article>
        </section>

        <section className="metrics-grid">
          <Metric
            icon={<ArrowUpRight size={19} />}
            iconClass="lime"
            title="Entradas do mês"
            value={money.format(metrics.income)}
            note="+8,2% em relação a junho"
          />
          <Metric
            icon={<ArrowDownRight size={19} />}
            iconClass="pink"
            title="Gastos do mês"
            value={money.format(metrics.expenses)}
            note="52% da sua receita"
          />
          <Metric
            icon={<CalendarDays size={19} />}
            iconClass="black"
            title="Média diária"
            value={money.format(metrics.daily)}
            note="Meta diária: R$ 120,00"
          />
        </section>

        <section className="dashboard-grid">
          <article className="transactions-panel">
            <div className="section-heading">
              <div>
                <h2>Transações recentes</h2>
                <p>Seus últimos lançamentos</p>
              </div>
              <button
                className="link-button"
                onClick={() => setActiveNav("Transações")}
              >
                Ver todas <ChevronRight size={16} />
              </button>
            </div>
            <div className="transactions-list">
              {transactions.slice(0, 5).map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          </article>
          <article className="future-panel">
            <div className="section-heading">
              <div>
                <h2>Próximos meses</h2>
                <p>Parcelas e recorrências</p>
              </div>
              <button className="more">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <div className="future-total">
              <span>Gastos futuros</span>
              <strong>{money.format(metrics.future + 119.7)}</strong>
            </div>
            <div className="future-item">
              <div className="future-icon purple">
                <ShoppingBag size={18} />
              </div>
              <div>
                <strong>Notebook</strong>
                <p>7 parcelas restantes</p>
              </div>
              <span>{money.format(420)}</span>
            </div>
            <div className="future-item">
              <div className="future-icon orange">
                <CircleDollarSign size={18} />
              </div>
              <div>
                <strong>Netflix</strong>
                <p>Todo dia 08</p>
              </div>
              <span>{money.format(39.9)}</span>
            </div>
            <button className="future-button">
              Ver planejamento <ArrowUpRight size={16} />
            </button>
          </article>
        </section>
      </section>
      {isModalOpen && (
        <TransactionModal close={() => setModalOpen(false)} />
      )}
    </main>
  );
}

function Metric({
  icon,
  iconClass,
  title,
  value,
  note,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  value: string;
  note: string;
}) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${iconClass}`}>{icon}</div>
      <p>{title}</p>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isIncome = transaction.type === "INCOME";
  const Icon =
    transaction.category === "Restaurante"
      ? Utensils
      : transaction.category === "Mercado"
        ? ShoppingBag
        : WalletCards;
  return (
    <div className="transaction-row">
      <div className={`transaction-icon ${isIncome ? "income" : "expense"}`}>
        <Icon size={18} />
      </div>
      <div className="transaction-info">
        <strong>{transaction.description}</strong>
        <p>
          {formatDate(transaction.date)} · {transaction.category}
          {transaction.currentInstallment
            ? ` · ${transaction.currentInstallment}/${transaction.totalInstallments}`
            : ""}
        </p>
      </div>
      <div
        className={`transaction-amount ${isIncome ? "positive" : "negative"}`}
      >
        <strong>
          {isIncome ? "+" : "-"}
          {money.format(transaction.amount)}
        </strong>
        <span>
          {transaction.mode === "RECURRING"
            ? "Recorrente"
            : transaction.mode === "INSTALLMENT"
              ? "Parcelado"
              : "À vista"}
        </span>
      </div>
    </div>
  );
}

function TransactionModal({ close }: { close: () => void }) {
  const [type, setType] = useState<TransactionType>("EXPENSE");
  const [mode, setMode] = useState<TransactionMode>("SINGLE");

  return (
    <div className="modal-overlay" onMouseDown={close}>
      <form
        className="modal"
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">NOVO LANÇAMENTO</p>
            <h2>Vamos registrar?</h2>
          </div>
          <button type="button" className="close" onClick={close}>
            <X size={20} />
          </button>
        </div>
        <div className="toggle-row">
          <button
            type="button"
            className={type === "EXPENSE" ? "selected expense-select" : ""}
            onClick={() => setType("EXPENSE")}
          >
            Saída
          </button>
          <button
            type="button"
            className={type === "INCOME" ? "selected income-select" : ""}
            onClick={() => setType("INCOME")}
          >
            Entrada
          </button>
        </div>
        <label>
          Descrição
          <input name="description" placeholder="Ex.: Mercado da semana" />
        </label>
        <label>
          Valor
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0,00"
          />
        </label>
        <div className="form-row">
          <label>
            Categoria
            <select name="category">
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Data
            <input name="date" type="date" defaultValue="2026-07-17" />
          </label>
        </div>
        <label>
          Como será pago?
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as TransactionMode)}
          >
            <option value="SINGLE">À vista</option>
            <option value="INSTALLMENT">Parcelado</option>
            <option value="RECURRING">Recorrente</option>
          </select>
        </label>
        {mode === "INSTALLMENT" && (
          <label>
            Número de parcelas
            <input name="installments" type="number" min="2" defaultValue="2" />
          </label>
        )}
        <button className="submit-button">
          <Plus size={18} /> Salvar transação
        </button>
      </form>
    </div>
  );
}

export default TestPage;

