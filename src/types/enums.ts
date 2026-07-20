import z from "zod";

export const transactionCategoryEnum = z.enum([
  "SALARY",
  "FREELANCE",
  "BONUS",
  "INVESTMENT",
  "GIFT",
  "REFUND",
  "OTHER_INCOME",
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
