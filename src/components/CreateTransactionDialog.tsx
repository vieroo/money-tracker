import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import {
  type TransactionCategory,
  type TransactionMode,
  expenseCategories,
  incomeCategories,
  transactionModeEnum,
} from "@/types/enums";
import {
  createTransactionSchema,
  type CreateTransactionData,
} from "@/types/transaction";
import { formatBRL } from "@/utils/string";
import { getTodayISO } from "@/utils/date";
import { categoryTranslationMap, modeTranslationMap } from "@/utils/translate";

import { useCreateTransaction } from "@/hooks/useTransactions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const modes = transactionModeEnum.options;

interface CreateTransactionDialogProps {
  onSuccess?: (data: CreateTransactionData) => void;
  trigger?: React.ReactElement;
}

export function CreateTransactionDialog({
  onSuccess,
  trigger,
}: CreateTransactionDialogProps = {}) {
  const [open, setOpen] = useState(false);
  const createTransactionMutation = useCreateTransaction();

  const form = useForm<CreateTransactionData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      description: "",
      type: "EXPENSE",
      category: expenseCategories[0],
      amount: undefined as unknown as number,
      date: getTodayISO(),
      transaction_mode: "SINGLE",
      total_installments: null,
      current_installment: null,
      installment_group_id: null,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const watchType = watch("type");
  const watchMode = watch("transaction_mode");
  const watchCategory = watch("category");
  const watchAmount = watch("amount");
  const watchInstallments = watch("total_installments");

  const activeCategories: readonly TransactionCategory[] =
    watchType === "INCOME" ? incomeCategories : expenseCategories;

  function handleTypeChange(newType: "EXPENSE" | "INCOME") {
    setValue("type", newType, { shouldValidate: true });

    const targetCategories: readonly TransactionCategory[] =
      newType === "INCOME" ? incomeCategories : expenseCategories;
    if (!targetCategories.includes(watchCategory)) {
      setValue("category", targetCategories[0], { shouldValidate: true });
    }

    if (newType === "INCOME") {
      setValue("transaction_mode", "SINGLE", { shouldValidate: true });
      setValue("total_installments", null, { shouldValidate: true });
    }
  }

  const amountNum =
    typeof watchAmount === "number" && !isNaN(watchAmount) ? watchAmount : 0;
  const installmentsNum =
    typeof watchInstallments === "number" &&
    !isNaN(watchInstallments) &&
    watchInstallments > 0
      ? watchInstallments
      : 0;
  const installmentValue =
    installmentsNum > 0 ? amountNum / installmentsNum : 0;

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  }

  async function onSubmit(data: CreateTransactionData) {
    try {
      await createTransactionMutation.mutateAsync(data);
      toast.success(
        data.transaction_mode === "INSTALLMENT"
          ? "Transação parcelada criada com sucesso!"
          : "Transação criada com sucesso!",
      );
      onSuccess?.(data);
      reset();
      setOpen(false);
    } catch (error: any) {
      console.error("Erro ao criar transação:", error);
      toast.error(
        error?.message || "Erro ao criar transação. Tente novamente.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          trigger ?? (
            <Button className="btn-primary p-5">
              <Plus size={14} />{" "}
              <span className="text-[14px] font-bold leading-[14px]">
                Nova transação
              </span>
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-[460px] p-[26px] gap-0 rounded-[16px] border-none shadow-[0_24px_60px_rgba(0,0,0,0.25)] bg-background">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-0">
          {/* Header */}
          <DialogHeader className="flex justify-between items-start mb-5 pb-0">
            <div>
              <p className="text-[10px] font-bold tracking-[1.2px] text-muted-foreground/80 uppercase m-0 mb-[9px]">
                NOVO LANÇAMENTO
              </p>
              <DialogTitle className="text-[23px] font-bold tracking-[-1px] text-ink m-0">
                Vamos registrar?
              </DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex flex-col gap-0">
            {/* Toggle Saída / Entrada */}
            <div className="grid grid-cols-2 p-1 bg-[#f1f1ef] rounded-[8px] gap-1 mb-[18px]">
              <button
                type="button"
                onClick={() => handleTypeChange("EXPENSE")}
                className={cn(
                  "py-2.5 rounded-[6px] text-[13px] font-bold transition-all cursor-pointer",
                  watchType === "EXPENSE"
                    ? "bg-background text-destructive shadow-[0_2px_6px_rgba(0,0,0,0.07)]"
                    : "text-muted-foreground/90 hover:bg-[#f1f1ef]",
                )}
              >
                Saída
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange("INCOME")}
                className={cn(
                  "py-2.5 rounded-[6px] text-[13px] font-bold transition-all cursor-pointer",
                  watchType === "INCOME"
                    ? "bg-background text-[#438714] shadow-[0_2px_6px_rgba(0,0,0,0.07)]"
                    : "text-muted-foreground/90 hover:bg-[#f1f1ef]",
                )}
              >
                Entrada
              </button>
            </div>

            {/* Descrição */}
            <div className="flex flex-col gap-1.5 mb-3">
              <Label
                htmlFor="description"
                className="text-[11px] font-bold text-[#565656]"
              >
                Descrição
              </Label>
              <Input
                id="description"
                placeholder="Ex.: Mercado da semana"
                className="h-[43px] border-border rounded-[10px] text-[13px] text-foreground"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-[11px] text-destructive">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Valor */}
            <div className="flex flex-col gap-1.5 mb-3">
              <Label
                htmlFor="amount"
                className="text-[11px] font-bold text-[#565656]"
              >
                Valor
              </Label>
              <Input
                id="amount"
                type="text"
                inputMode="numeric"
                placeholder="R$ 0,00"
                className="h-[43px] border-border rounded-[10px] text-[13px] text-foreground"
                value={watchAmount ? formatBRL(watchAmount) : ""}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, "");
                  if (!rawValue) {
                    setValue("amount", undefined as unknown as number, {
                      shouldValidate: true,
                    });
                    return;
                  }
                  const numericValue = parseFloat(rawValue) / 100;
                  setValue("amount", numericValue, { shouldValidate: true });
                }}
              />
              {errors.amount && (
                <span className="text-[11px] text-destructive">
                  {errors.amount.message}
                </span>
              )}
            </div>

            {/* Categoria + Data */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-[11px] font-bold text-[#565656]">
                  Categoria
                </Label>
                <Select
                  value={watchCategory}
                  onValueChange={(v) =>
                    setValue("category", v as TransactionCategory, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="w-full h-[43px] border-border rounded-[10px] text-[13px] text-foreground">
                    <span>{categoryTranslationMap[watchCategory]}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border rounded-[10px]">
                    {activeCategories.map((c) => (
                      <SelectItem
                        key={c}
                        value={c}
                        className="text-[13px] text-foreground hover:bg-[#f1f1ef]"
                      >
                        {categoryTranslationMap[c]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <span className="text-[11px] text-destructive">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="date"
                  className="text-[11px] font-bold text-[#565656]"
                >
                  Data
                </Label>
                <Input
                  id="date"
                  type="date"
                  className="h-[43px] border-border rounded-[10px] text-[13px] text-foreground"
                  {...register("date")}
                />
                {errors.date && (
                  <span className="text-[11px] text-destructive">
                    {errors.date.message}
                  </span>
                )}
              </div>
            </div>

            {/* Como será pago? (apenas para Saída) */}
            {watchType === "EXPENSE" && (
              <div className="flex flex-col gap-1.5 mb-3">
                <Label className="text-[11px] font-bold text-[#565656]">
                  Como será pago?
                </Label>
                <Select
                  value={watchMode}
                  onValueChange={(v) => {
                    const newMode = v as TransactionMode;
                    setValue("transaction_mode", newMode, {
                      shouldValidate: true,
                    });
                    if (newMode === "INSTALLMENT") {
                      if (!watchInstallments || watchInstallments < 2) {
                        setValue("total_installments", 2, {
                          shouldValidate: true,
                        });
                      }
                    } else {
                      setValue("total_installments", null, {
                        shouldValidate: true,
                      });
                    }
                  }}
                >
                  <SelectTrigger className="w-full h-[43px] border-border rounded-[10px] text-[13px] text-foreground">
                    <span>{modeTranslationMap[watchMode]}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border rounded-[10px]">
                    {modes.map((m) => (
                      <SelectItem
                        key={m}
                        value={m}
                        className="text-[13px] text-foreground hover:bg-[#f1f1ef]"
                      >
                        {modeTranslationMap[m]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.transaction_mode && (
                  <span className="text-[11px] text-destructive">
                    {errors.transaction_mode.message}
                  </span>
                )}
              </div>
            )}

            {/* Parcelas (condicional para EXPENSE + INSTALLMENT) */}
            {watchType === "EXPENSE" && watchMode === "INSTALLMENT" && (
              <div className="flex flex-col gap-1.5 mb-3">
                <Label
                  htmlFor="total_installments"
                  className="text-[11px] font-bold text-[#565656]"
                >
                  Número de parcelas
                </Label>
                <Input
                  id="total_installments"
                  type="number"
                  min="2"
                  className="h-[43px] border-border rounded-[10px] text-[13px] text-foreground"
                  {...register("total_installments", { valueAsNumber: true })}
                />
                {errors.total_installments && (
                  <span className="text-[11px] text-destructive">
                    {errors.total_installments.message}
                  </span>
                )}
                {amountNum > 0 && installmentsNum >= 2 && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 ml-1">
                    {installmentsNum} x {formatBRL(installmentValue)}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-[22px]">
            <Button
              type="submit"
              disabled={createTransactionMutation.isPending}
              className="w-full h-12 text-[13px] font-bold bg-ink text-background hover:bg-[#333] rounded-[8px] shadow-[0_5px_14px_rgba(0,0,0,0.09)] cursor-pointer disabled:opacity-50"
            >
              {createTransactionMutation.isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Salvar transação
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
