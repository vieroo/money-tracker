import z from "zod";
import {
  transactionCategoryEnum,
  transactionModeEnum,
  transactionTypeEnum,
} from "./enums";

// Schema base da transaction (representa o registro completo do banco)

export const transactionSchema = z.object({
  id: z.uuid(),
  user_id: z.uuid(),
  description: z.string(),
  type: transactionTypeEnum,
  category: transactionCategoryEnum,
  amount: z.number().positive(),
  date: z.string(),
  transaction_mode: transactionModeEnum,
  total_installments: z.number().int().positive().nullable(),
  current_installment: z.number().int().positive().nullable(),
  installment_group_id: z.uuid().nullable(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Transaction = z.infer<typeof transactionSchema>;

// Criar transaction

export const createTransactionSchema = z
  .object({
    description: z.string().min(1, "Por favor, insira uma descrição"),
    type: transactionTypeEnum,
    category: transactionCategoryEnum,
    amount: z.number().positive("O valor deve ser maior que zero"),
    date: z.string().min(1, "Por favor, insira uma data"),
    transaction_mode: transactionModeEnum,
    total_installments: z.number().int().positive().nullable().default(null),
    current_installment: z.number().int().positive().nullable().default(null),
    installment_group_id: z.uuid().nullable().default(null),
  })
  .refine(
    (data) => {
      if (data.transaction_mode === "INSTALLMENT") {
        return data.total_installments !== null && data.total_installments >= 2;
      }
      return true;
    },
    {
      message: "Parcelamentos devem ter pelo menos 2 parcelas",
      path: ["total_installments"],
    },
  );

export type CreateTransactionData = z.infer<typeof createTransactionSchema>;

// Atualizar transaction

export const updateTransactionSchema = z.object({
  description: z.string().min(1, "Por favor, insira uma descrição").optional(),
  type: transactionTypeEnum.optional(),
  category: transactionCategoryEnum.optional(),
  amount: z.number().positive("O valor deve ser maior que zero").optional(),
  date: z.string().min(1, "Por favor, insira uma data").optional(),
  transaction_mode: transactionModeEnum.optional(),
  total_installments: z.number().int().positive().nullable().optional(),
  current_installment: z.number().int().positive().nullable().optional(),
  is_active: z.boolean().optional(),
});

export type UpdateTransactionData = z.infer<typeof updateTransactionSchema>;

// Listar transactions (filtros de query)

export const listTransactionsQuerySchema = z.object({
  type: transactionTypeEnum.optional(),
  category: transactionCategoryEnum.optional(),
  transaction_mode: transactionModeEnum.optional(),
  is_active: z.boolean().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
});

export type ListTransactionsQuery = z.infer<typeof listTransactionsQuerySchema>;
