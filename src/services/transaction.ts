import type { CreateTransactionData, Transaction } from "@/types/transaction";
import { supabase } from "./supabase";

export const transactionService = {
  async list() {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("transaction_date", { ascending: false });

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

  async create(transaction: CreateTransactionData) {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .select()
      .single();

    if (error) throw error;

    return data as Transaction;
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
