import { Pill, X } from "lucide-react";

interface MedicationListProps {
  medications: string[];
  onRemove: (name: string) => void;
}

export function MedicationList({ medications, onRemove }: MedicationListProps) {
  if (medications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center">
        <Pill className="mx-auto mb-2 h-5 w-5 text-muted-foreground" aria-hidden />
        <p className="text-sm text-muted-foreground">
          No medications added yet. Add at least two to check for interactions.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-sm font-medium text-foreground">
        Selected medications{" "}
        <span className="text-muted-foreground">({medications.length})</span>
      </h2>
      <ul className="flex flex-wrap gap-2">
        {medications.map((m) => (
          <li
            key={m}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-primary-soft py-1.5 pl-3 pr-1.5 text-sm font-medium text-foreground shadow-soft"
          >
            <span>{m}</span>
            <button
              type="button"
              onClick={() => onRemove(m)}
              aria-label={`Remove ${m}`}
              className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition hover:bg-background hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
