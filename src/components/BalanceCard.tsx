import { useState } from "react";
import { ArrowUpRight, Plus, Sparkles, ChevronRight } from "lucide-react";
import { formatBRL } from "@/utils/string";
import { CreateTransactionDialog } from "./CreateTransactionDialog";

interface BalanceCardProps {
  balance: number;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <section className="balance-grid">
      <article className="balance-card">
        <div className="card-label">
          SALDO ATUAL{" "}
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="visibility"
            type="button"
            title={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {showBalance ? "◉" : "○"}
          </button>
        </div>
        <strong>
          {showBalance ? formatBRL(balance) : "••••••"}
        </strong>
        <p>
          <span className="balance-dot" /> Atualizado agora
        </p>
        <div className="balance-actions">
          <CreateTransactionDialog
            trigger={
              <button type="button" className="dark-action">
                <Plus size={16} /> Adicionar
              </button>
            }
          />
          <button type="button" className="soft-action">
            Transferir <ArrowUpRight size={15} />
          </button>
        </div>
      </article>

      <CreateTransactionDialog
        trigger={
          <article className="quick-card cursor-pointer">
            <div className="quick-icon">
              <Sparkles size={22} />
            </div>
            <div>
              <h3>Registro rápido</h3>
              <p>Adicione uma entrada ou saída em segundos.</p>
            </div>
            <ChevronRight className="quick-arrow" />
          </article>
        }
      />
    </section>
  );
}
