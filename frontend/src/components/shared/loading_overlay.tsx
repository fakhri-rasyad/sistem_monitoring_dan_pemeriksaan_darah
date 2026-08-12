import { Spinner } from "../ui/spinner";

export function LoadingOverlay({
  text = "Menyimpan data...",
}: {
  text?: string;
}) {
  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-background/70 backdrop-blur-sm
      "
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className="flex flex-col items-center gap-3 rounded-lg bg-background p-6 shadow-lg">
        <Spinner className="size-8" />
        <span className="text-sm text-muted-foreground">{text}</span>
      </div>
    </div>
  );
}
