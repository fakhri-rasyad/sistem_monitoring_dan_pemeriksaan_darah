export default function formatDate(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    dateStyle: "medium",
  });
}
