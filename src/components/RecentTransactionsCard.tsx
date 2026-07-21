import {
  ChevronRight,
  Utensils,
  ShoppingBag,
  WalletCards,
  HeartPulse,
  Car,
  Home,
  GraduationCap,
  Sparkles,
  ReceiptText,
  Loader2,
} from "lucide-react";
import type { Transaction } from "@/types/transaction";
import { formatBRL } from "@/utils/string";
import { categoryTranslationMap, modeTranslationMap } from "@/utils/translate";

interface RecentTransactionsCardProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "FOOD":
    case "RESTAURANT":
      return Utensils;
    case "MARKET":
    case "SHOPPING":
      return ShoppingBag;
    case "SALARY":
    case "FREELANCE":
    case "BONUS":
    case "INVESTMENT":
      return WalletCards;
    case "HEALTH":
      return HeartPulse;
    case "TRANSPORT":
    case "FUEL":
      return Car;
    case "HOUSING":
    case "UTILITIES":
      return Home;
    case "EDUCATION":
      return GraduationCap;
    case "ENTERTAINMENT":
    case "FUN":
      return Sparkles;
    default:
      return ReceiptText;
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length < 3 || parts.some(isNaN)) return dateStr;
  const [year, month, day] = parts;
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(date);
}

export function RecentTransactionsCard({
  transactions,
  isLoading,
  onViewAll,
}: RecentTransactionsCardProps) {
  const recentList = transactions.slice(0, 5);

  return (
    <article className="transactions-panel">
      <div className="section-heading">
        <div>
          <h2>Transações recentes</h2>
          <p>Seus últimos lançamentos</p>
        </div>
        {onViewAll && (
          <button className="link-button" onClick={onViewAll} type="button">
            Ver todas <ChevronRight size={16} />
          </button>
        )}
      </div>

      <div className="transactions-list">
        {isLoading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground gap-2">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-xs font-medium">Carregando transações...</span>
          </div>
        ) : recentList.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-xs font-medium">
            Nenhuma transação encontrada.
          </div>
        ) : (
          recentList.map((transaction) => {
            const isIncome = transaction.type === "INCOME";
            const Icon = getCategoryIcon(transaction.category);
            const categoryLabel =
              categoryTranslationMap[transaction.category] ?? transaction.category;
            const modeLabel =
              modeTranslationMap[transaction.transaction_mode] ?? transaction.transaction_mode;

            return (
              <div key={transaction.id} className="transaction-row">
                <div
                  className={`transaction-icon ${
                    isIncome ? "income" : "expense"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="transaction-info">
                  <strong>{transaction.description}</strong>
                  <p>
                    {formatDate(transaction.date)} · {categoryLabel}
                    {transaction.current_installment && transaction.total_installments
                      ? ` · ${transaction.current_installment}/${transaction.total_installments}`
                      : ""}
                  </p>
                </div>
                <div
                  className={`transaction-amount ${
                    isIncome ? "positive" : "negative"
                  }`}
                >
                  <strong>
                    {isIncome ? "+" : "-"}
                    {formatBRL(transaction.amount)}
                  </strong>
                  <span>{modeLabel}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </article>
  );
}
