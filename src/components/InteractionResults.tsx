import { CheckCircle2, ShieldAlert } from "lucide-react";
import type { Interaction } from "@/services/api";

interface InteractionResultsProps {
  results: Interaction[] | null; // null = not checked yet
}

const severityClasses: Record<Interaction["severity"], string> = {
  Mild: "bg-severity-mild text-severity-mild-foreground",
  Moderate: "bg-severity-moderate text-severity-moderate-foreground",
  Severe: "bg-severity-severe text-severity-severe-foreground",
};

export function InteractionResults({ results }: InteractionResultsProps) {
  if (results === null) return null;

  if (results.length === 0) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-border bg-primary-soft/60 p-4 text-sm">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
        <div>
          <p className="font-medium text-foreground">No known interactions found</p>
          <p className="mt-1 text-muted-foreground">
            Always confirm with a qualified healthcare professional before changing
            any medication.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-primary" aria-hidden />
        <h2 className="text-sm font-medium text-foreground">
          {results.length} potential interaction{results.length > 1 ? "s" : ""} found
        </h2>
      </div>
      <ul className="space-y-3">
        {results.map((r, i) => (
          <li
            key={`${r.drug1}-${r.drug2}-${i}`}
            className="rounded-xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-foreground">
                <span>{r.drug1}</span>
                <span className="text-muted-foreground">×</span>
                <span>{r.drug2}</span>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityClasses[r.severity]}`}
              >
                {r.severity}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {r.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
