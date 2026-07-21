import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "@/services/transaction";
import type { CreateTransactionData } from "@/types/transaction";

export const TRANSACTION_KEYS = {
  all: ["transactions"] as const,
  lists: () => [...TRANSACTION_KEYS.all, "list"] as const,
  details: () => [...TRANSACTION_KEYS.all, "detail"] as const,
  detail: (id: string) => [...TRANSACTION_KEYS.details(), id] as const,
};

export function useTransactions() {
  return useQuery({
    queryKey: TRANSACTION_KEYS.lists(),
    queryFn: () => transactionService.list(),
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionData) => transactionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTION_KEYS.all });
    },
  });
}
