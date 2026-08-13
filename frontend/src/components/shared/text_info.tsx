export default function TextInfo({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div>
      <p className="mb-1 text-sm text-muted-foreground">{label}</p>

      <div className="rounded-md border bg-muted/30 p-3 text-sm">
        {value || "-"}
      </div>
    </div>
  );
}
