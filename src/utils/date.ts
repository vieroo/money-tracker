export function getMonthLabel(date: Date): string {
  return date
    .toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
    .replace(" de ", " de ");
}

export function getTodayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
