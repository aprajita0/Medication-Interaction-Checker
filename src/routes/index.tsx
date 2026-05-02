import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { MedicationInput } from "@/components/MedicationInput";
import { MedicationList } from "@/components/MedicationList";
import { InteractionResults } from "@/components/InteractionResults";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { checkInteractions, type Interaction } from "@/services/api";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MentalMed Interaction Checker" },
      {
        name: "description",
        content:
          "Check for potential interactions between mental health medications. Fast, clear, and easy to use.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [medications, setMedications] = useState<string[]>([]);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addMedication(name: string) {
    setMedications((prev) =>
      prev.some((m) => m.toLowerCase() === name.toLowerCase())
        ? prev
        : [...prev, name],
    );
    setResults(null);
  }

  function removeMedication(name: string) {
    setMedications((prev) => prev.filter((m) => m !== name));
    setResults(null);
  }

  async function handleCheck() {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await checkInteractions(medications);
      setResults(res);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while checking interactions. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  const canCheck = medications.length >= 2 && !loading;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="rounded-3xl border border-border bg-card p-5 shadow-card sm:p-8">
          <MedicationInput onAdd={addMedication} existing={medications} />

          <div className="mt-8">
            <MedicationList
              medications={medications}
              onRemove={removeMedication}
            />
          </div>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              {medications.length < 2
                ? "Add at least 2 medications to check interactions."
                : `Ready to check ${medications.length} medications.`}
            </p>
            <Button
              type="button"
              onClick={handleCheck}
              disabled={!canCheck}
              className="h-11 rounded-xl px-5"
            >
              <ShieldCheck className="mr-1.5 h-4 w-4" aria-hidden />
              {loading ? "Checking..." : "Check Interactions"}
            </Button>
          </div>

          <div className="mt-6">
            {loading && <LoadingSpinner label="Checking interactions..." />}
            {error && !loading && <ErrorMessage message={error} />}
            {!loading && !error && (
              <InteractionResults results={results} />
            )}
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          For informational purposes only — not a substitute for professional
          medical advice.
        </p>
      </main>
    </div>
  );
}
