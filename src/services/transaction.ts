import type { CreateTransactionData, Transaction } from "@/types/transaction";
import { supabase } from "./supabase";

function addMonths(dateStr: string, monthsToAdd: number): string {
  const [yearStr, monthStr, dayStr] = dateStr.split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const targetMonthDate = new Date(year, month + monthsToAdd, 1);
  const targetYear = targetMonthDate.getFullYear();
  const targetMonth = targetMonthDate.getMonth();

  const maxDaysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  const targetDay = Math.min(day, maxDaysInMonth);

  const mm = String(targetMonth + 1).padStart(2, "0");
  const dd = String(targetDay).padStart(2, "0");

  return `${targetYear}-${mm}-${dd}`;
}

export const transactionService = {
  async list() {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    return data as Transaction[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Transaction;
  },

  async create(data: CreateTransactionData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Usuário não autenticado");

    if (
      data.transaction_mode === "INSTALLMENT" &&
      data.total_installments &&
      data.total_installments >= 2
    ) {
      const groupId = crypto.randomUUID();
      const totalInstallments = data.total_installments;
      const installmentAmount = Number(
        (data.amount / totalInstallments).toFixed(2),
      );

      const records = [];

      for (let i = 1; i <= totalInstallments; i++) {
        records.push({
          user_id: user.id,
          description: data.description,
          type: data.type,
          category: data.category,
          amount: installmentAmount,
          date: addMonths(data.date, i - 1),
          transaction_mode: "INSTALLMENT",
          total_installments: totalInstallments,
          current_installment: i,
          installment_group_id: groupId,
        });
      }

      const { data: insertedData, error } = await supabase
        .from("transactions")
        .insert(records)
        .select();

      if (error) throw error;

      return insertedData as Transaction[];
    }

    const { data: insertedData, error } = await supabase
      .from("transactions")
      .insert({
        user_id: user.id,
        description: data.description,
        type: data.type,
        category: data.category,
        amount: data.amount,
        date: data.date,
        transaction_mode: data.transaction_mode,
        total_installments: data.total_installments ?? 1,
        current_installment: data.current_installment ?? 1,
        installment_group_id: null,
      })
      .select()
      .single();

    if (error) throw error;

    return insertedData as Transaction;
  },

  async update(id: string, transaction: Partial<CreateTransactionData>) {
    const { data, error } = await supabase
      .from("transactions")
      .update(transaction)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Transaction;
  },

  async delete(id: string) {
    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (error) throw error;
  },
};
