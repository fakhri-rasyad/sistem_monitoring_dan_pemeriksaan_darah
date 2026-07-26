export function dateToSugar(dateTime: string): string {
  const date = new Date(dateTime)
  const dateString = date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  return dateString
}
