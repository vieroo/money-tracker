export function getMonthLabel(date: Date): string {
  return date
    .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    .replace(" de ", " de ");
}
