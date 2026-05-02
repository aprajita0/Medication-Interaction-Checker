// Mock medication catalog used by searchMedications().
// Replace with backend results when API is wired up.
export const MOCK_MEDICATIONS: string[] = [
  "Sertraline",
  "Fluoxetine",
  "Escitalopram",
  "Citalopram",
  "Paroxetine",
  "Venlafaxine",
  "Duloxetine",
  "Bupropion",
  "Mirtazapine",
  "Alprazolam",
  "Lorazepam",
  "Clonazepam",
  "Diazepam",
  "Quetiapine",
  "Risperidone",
  "Olanzapine",
  "Aripiprazole",
  "Lithium",
  "Lamotrigine",
  "Valproate",
  "Trazodone",
  "Buspirone",
  "Methylphenidate",
  "Atomoxetine",
  "Melatonin",
  "Zolpidem",
];

export interface Interaction {
  drug1: string;
  drug2: string;
  severity: "Mild" | "Moderate" | "Severe";
  description: string;
}

// Mock pairwise interactions (case-insensitive lookup in API service).
export const MOCK_INTERACTIONS: Interaction[] = [
  {
    drug1: "Sertraline",
    drug2: "Alprazolam",
    severity: "Moderate",
    description:
      "Using these medications together may increase dizziness, drowsiness, confusion, and difficulty concentrating.",
  },
  {
    drug1: "Fluoxetine",
    drug2: "Bupropion",
    severity: "Severe",
    description:
      "Combining these can lower the seizure threshold and increase the risk of serotonin syndrome. Close monitoring is required.",
  },
  {
    drug1: "Sertraline",
    drug2: "Trazodone",
    severity: "Severe",
    description:
      "Risk of serotonin syndrome — symptoms include confusion, rapid heart rate, high blood pressure, and tremor.",
  },
  {
    drug1: "Lithium",
    drug2: "Venlafaxine",
    severity: "Moderate",
    description:
      "May increase the risk of serotonin syndrome and lithium toxicity. Monitor lithium levels closely.",
  },
  {
    drug1: "Quetiapine",
    drug2: "Lorazepam",
    severity: "Moderate",
    description:
      "Additive CNS depression — increased sedation, respiratory depression, and impaired coordination.",
  },
  {
    drug1: "Escitalopram",
    drug2: "Melatonin",
    severity: "Mild",
    description:
      "Possible additive drowsiness. Generally well tolerated but use caution when driving.",
  },
  {
    drug1: "Lamotrigine",
    drug2: "Valproate",
    severity: "Severe",
    description:
      "Valproate significantly increases lamotrigine levels, raising the risk of serious skin reactions including Stevens-Johnson syndrome.",
  },
  {
    drug1: "Methylphenidate",
    drug2: "Fluoxetine",
    severity: "Moderate",
    description:
      "May increase blood pressure, heart rate, and the risk of agitation. Monitor cardiovascular signs.",
  },
];
