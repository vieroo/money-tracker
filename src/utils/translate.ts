import {
  type TransactionCategory,
  type TransactionMode,
  type TransactionType,
} from "@/types/enums";

export const categoryTranslationMap: Record<TransactionCategory, string> = {
  SALARY: "Salário",
  FREELANCE: "Freelance",
  BONUS: "Bônus",
  INVESTMENT: "Investimento",
  GIFT: "Presente",
  REFUND: "Reembolso",
  OTHER_INCOME: "Outras Receitas",
  FOOD: "Alimentação",
  MARKET: "Mercado",
  RESTAURANT: "Restaurante",
  TRANSPORT: "Transporte",
  FUEL: "Combustível",
  HOUSING: "Moradia",
  UTILITIES: "Contas e Serviços",
  HEALTH: "Saúde",
  EDUCATION: "Educação",
  SHOPPING: "Compras",
  ENTERTAINMENT: "Entretenimento",
  SUBSCRIPTION: "Assinaturas",
  TRAVEL: "Viagem",
  PET: "Pet",
  TAX: "Impostos",
  OTHER_EXPENSE: "Outras Despesas",
  FUN: "Lazer",
};

export const modeTranslationMap: Record<TransactionMode, string> = {
  SINGLE: "À vista",
  INSTALLMENT: "Parcelado",
  RECURRING: "Recorrente",
};

export const typeTranslationMap: Record<TransactionType, string> = {
  INCOME: "Entrada",
  EXPENSE: "Saída",
};
