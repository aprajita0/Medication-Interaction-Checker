// API service layer.
// Currently returns mock data. To connect a real Express backend later,
// replace the function bodies with fetch() calls to your endpoints —
// the function signatures and return shapes should stay the same.

import {
  MOCK_MEDICATIONS,
  MOCK_INTERACTIONS,
  type Interaction,
} from "@/data/mockMedications";

// e.g. const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Search medications by name (prefix / substring match).
 * Future: GET `${API_BASE}/medications?q=${encodeURIComponent(name)}`
 */
export async function searchMedications(name: string): Promise<string[]> {
  await delay(150);
  const q = name.trim().toLowerCase();
  if (!q) return [];
  return MOCK_MEDICATIONS.filter((m) => m.toLowerCase().includes(q)).slice(0, 8);
}

/**
 * Check interactions between a list of medications.
 * Future: POST `${API_BASE}/interactions` with { medications }
 */
export async function checkInteractions(
  medications: string[],
): Promise<Interaction[]> {
  await delay(700);

  if (medications.length < 2) return [];

  const norm = (s: string) => s.trim().toLowerCase();
  const set = medications.map(norm);
  const results: Interaction[] = [];

  for (const i of MOCK_INTERACTIONS) {
    const a = norm(i.drug1);
    const b = norm(i.drug2);
    if (set.includes(a) && set.includes(b)) {
      results.push(i);
    }
  }
  return results;
}

export type { Interaction };
