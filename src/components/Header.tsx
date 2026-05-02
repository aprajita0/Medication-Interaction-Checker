import { Pill } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-5 sm:px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
          <Pill className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            MentalMed Interaction Checker
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Check possible interactions between mental health medications
          </p>
        </div>
      </div>
    </header>
  );
}
