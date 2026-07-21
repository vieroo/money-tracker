import z from "zod";

export const incomeCategories = [
  "SALARY",
  "FREELANCE",
  "BONUS",
  "INVESTMENT",
  "GIFT",
  "REFUND",
  "OTHER_INCOME",
] as const;

export const expenseCategories = [
  "FOOD",
  "MARKET",
  "RESTAURANT",
  "TRANSPORT",
  "FUEL",
  "HOUSING",
  "UTILITIES",
  "HEALTH",
  "EDUCATION",
  "SHOPPING",
  "ENTERTAINMENT",
  "SUBSCRIPTION",
  "TRAVEL",
  "PET",
  "TAX",
  "OTHER_EXPENSE",
  "FUN",
] as const;

export const transactionCategoryEnum = z.enum([
  ...incomeCategories,
  ...expenseCategories,
]);

export const transactionModeEnum = z.enum([
  "SINGLE",
  "INSTALLMENT",
  "RECURRING",
]);

export const transactionTypeEnum = z.enum(["INCOME", "EXPENSE"]);

export type TransactionCategory = z.infer<typeof transactionCategoryEnum>;
export type TransactionMode = z.infer<typeof transactionModeEnum>;
export type TransactionType = z.infer<typeof transactionTypeEnum>;
