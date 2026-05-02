import { useEffect, useRef, useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { searchMedications } from "@/services/api";

interface MedicationInputProps {
  onAdd: (name: string) => boolean | void; // returns false if duplicate
  existing: string[];
}

export function MedicationInput({ onAdd, existing }: MedicationInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Live suggestions (debounced)
  useEffect(() => {
    const q = value.trim();
    if (!q) {
      setSuggestions([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const res = await searchMedications(q);
        setSuggestions(res.filter((r) => !existing.includes(r)));
      } catch {
        setSuggestions([]);
      }
    }, 120);
    return () => clearTimeout(t);
  }, [value, existing]);

  // Close suggestions on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function handleAdd(name?: string) {
    const candidate = (name ?? value).trim();
    if (!candidate) {
      setError("Please enter a medication name.");
      return;
    }
    const isDup = existing.some(
      (m) => m.toLowerCase() === candidate.toLowerCase(),
    );
    if (isDup) {
      setError(`${candidate} is already in your list.`);
      return;
    }
    onAdd(candidate);
    setValue("");
    setError(null);
    setSuggestions([]);
    setOpen(false);
  }

  return (
    <div ref={wrapRef} className="relative">
      <label
        htmlFor="med-input"
        className="mb-2 block text-sm font-medium text-foreground"
      >
        Add a medication
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            id="med-input"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Enter medication name"
            aria-invalid={!!error}
            aria-describedby={error ? "med-input-error" : undefined}
            className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-3 text-sm shadow-soft outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
          {open && suggestions.length > 0 && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-full z-10 mt-2 max-h-56 overflow-auto rounded-xl border border-border bg-popover p-1 shadow-card"
            >
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => handleAdd(s)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-popover-foreground transition hover:bg-accent hover:text-accent-foreground"
                  >
                    <span>{s}</span>
                    <Plus className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          type="button"
          onClick={() => handleAdd()}
          className="h-11 rounded-xl px-5"
        >
          <Plus className="mr-1.5 h-4 w-4" aria-hidden />
          Add
        </Button>
      </div>
      {error && (
        <p
          id="med-input-error"
          role="alert"
          className="mt-2 text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
