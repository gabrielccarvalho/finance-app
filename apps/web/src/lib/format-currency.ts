export function formatCurrency(value: number | undefined) {
  if (!value) return "R$ 0,00"

  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)

  return formatted
}