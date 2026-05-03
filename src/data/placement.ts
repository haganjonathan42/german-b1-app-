import type { PlacementQuestion } from "@/types";

// 20 questions: Q1–7 = A1, Q8–14 = A2, Q15–20 = B1
// Scoring: 0–6 correct → A1 | 7–13 correct → A2 | 14–20 correct → B1

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // ── A1 Questions (1–7) ──────────────────────────────────────────────
  {
    id: "pt-1",
    placementLevel: "a1",
    question: "Ich ___ Student.",
    options: ["bin", "bist", "ist", "sind"],
    correct_answer: "bin",
    explanation: "sein (to be): ich bin, du bist, er/sie/es ist, wir sind. With 'ich' always use 'bin'.",
  },
  {
    id: "pt-2",
    placementLevel: "a1",
    question: "Er ___ eine Schwester.",
    options: ["hat", "habe", "haben", "habt"],
    correct_answer: "hat",
    explanation: "haben (to have): ich habe, du hast, er/sie/es hat. With 'er' use 'hat'.",
  },
  {
    id: "pt-3",
    placementLevel: "a1",
    question: "Wir ___ aus Deutschland.",
    options: ["kommen", "kommt", "kommst", "komme"],
    correct_answer: "kommen",
    explanation: "Regular verbs: wir (we) always takes the -en ending → wir kommen.",
  },
  {
    id: "pt-4",
    placementLevel: "a1",
    question: "___ kostet das Buch?",
    options: ["Wie viel", "Wie", "Was", "Wo"],
    correct_answer: "Wie viel",
    explanation: "'Wie viel' asks about price or quantity. Wie viel kostet das? = How much does it cost?",
  },
  {
    id: "pt-5",
    placementLevel: "a1",
    question: "Das ist ___ Hund. (masculine noun)",
    options: ["ein", "eine", "einen", "einem"],
    correct_answer: "ein",
    explanation: "Hund (dog) is masculine (der Hund). Indefinite article in nominative: masculine = ein.",
  },
  {
    id: "pt-6",
    placementLevel: "a1",
    question: "___ wohnst du?",
    options: ["Wo", "Wer", "Was", "Wie"],
    correct_answer: "Wo",
    explanation: "Wo = where. Wo wohnst du? = Where do you live?",
  },
  {
    id: "pt-7",
    placementLevel: "a1",
    question: "Maria und Paul ___ Freunde.",
    options: ["sind", "ist", "bin", "bist"],
    correct_answer: "sind",
    explanation: "Plural subjects (they) use 'sind'. Maria und Paul = sie (they) → sind.",
  },
  // ── A2 Questions (8–14) ─────────────────────────────────────────────
  {
    id: "pt-8",
    placementLevel: "a2",
    question: "Er hat das Buch ___.",
    options: ["gelesen", "lesen", "gelest", "liest"],
    correct_answer: "gelesen",
    explanation: "Perfekt = haben/sein + Partizip II. lesen is irregular: Partizip II = gelesen.",
  },
  {
    id: "pt-9",
    placementLevel: "a2",
    question: "Ich ___ gestern nach Berlin gefahren.",
    options: ["bin", "habe", "ist", "hat"],
    correct_answer: "bin",
    explanation: "fahren is a movement verb → uses sein in Perfekt: ich bin gefahren.",
  },
  {
    id: "pt-10",
    placementLevel: "a2",
    question: "Sie ___ sehr gut Deutsch sprechen.",
    options: ["kann", "kannst", "können", "könnt"],
    correct_answer: "kann",
    explanation: "können (can): ich kann, du kannst, er/sie kann. 'Sie' (she) = kann.",
  },
  {
    id: "pt-11",
    placementLevel: "a2",
    question: "Ich sehe ___ Mann.",
    options: ["den", "der", "dem", "des"],
    correct_answer: "den",
    explanation: "Mann is the direct object → Accusative. Masculine accusative: der → den.",
  },
  {
    id: "pt-12",
    placementLevel: "a2",
    question: "Er gibt ___ Kind ein Buch.",
    options: ["dem", "der", "den", "des"],
    correct_answer: "dem",
    explanation: "geben takes a dative object (the recipient). Kind is neuter → neuter dative: dem.",
  },
  {
    id: "pt-13",
    placementLevel: "a2",
    question: "Er ___ jeden Morgen um 7 Uhr ___.",
    options: ["steht / auf", "aufsteht / —", "steht / oben", "auf / steht"],
    correct_answer: "steht / auf",
    explanation: "aufstehen is a separable verb: the prefix 'auf' goes to the end. Er steht … auf.",
  },
  {
    id: "pt-14",
    placementLevel: "a2",
    question: "Ich lerne Deutsch, weil ich in Deutschland ___ möchte.",
    options: ["arbeiten", "arbeitest", "arbeitet", "gearbeitet"],
    correct_answer: "arbeiten",
    explanation: "After 'weil' (because), the verb goes to the end of the clause as an infinitive with a modal.",
  },
  // ── B1 Questions (15–20) ────────────────────────────────────────────
  {
    id: "pt-15",
    placementLevel: "b1",
    question: "Wenn ich Zeit ___, würde ich mehr reisen.",
    options: ["hätte", "habe", "hatte", "haben"],
    correct_answer: "hätte",
    explanation: "Konjunktiv II expresses hypothetical situations. hätte = Konjunktiv II of haben.",
  },
  {
    id: "pt-16",
    placementLevel: "b1",
    question: "Das Buch ___ von einem Studenten geschrieben.",
    options: ["wurde", "wird", "hat", "ist"],
    correct_answer: "wurde",
    explanation: "Passive voice (Passiv): wurde + Partizip II = past passive. Das Buch wurde … geschrieben.",
  },
  {
    id: "pt-17",
    placementLevel: "b1",
    question: "Das ist der Mann, ___ ich gestern gesehen habe.",
    options: ["den", "der", "dem", "dessen"],
    correct_answer: "den",
    explanation: "Relative clause: 'Mann' is the object of 'gesehen habe' → accusative → den.",
  },
  {
    id: "pt-18",
    placementLevel: "b1",
    question: "Er fragte, ___ ich kommen würde.",
    options: ["ob", "dass", "wenn", "weil"],
    correct_answer: "ob",
    explanation: "'ob' introduces an indirect yes/no question. He asked whether I would come.",
  },
  {
    id: "pt-19",
    placementLevel: "b1",
    question: "Ich lerne Deutsch, ___ in Deutschland arbeiten ___.",
    options: ["um / zu", "damit / —", "für / zu", "weil / —"],
    correct_answer: "um / zu",
    explanation: "um…zu + infinitive expresses purpose (in order to). The infinitive goes at the end.",
  },
  {
    id: "pt-20",
    placementLevel: "b1",
    question: "___ er müde war, hat er weitergearbeitet.",
    options: ["Obwohl", "Weil", "Wenn", "Dass"],
    correct_answer: "Obwohl",
    explanation: "'obwohl' (although) introduces a concessive clause — something unexpected given the circumstances.",
  },
];

export function scorePlacement(answers: Record<string, string>): {
  score: number;
  level: "a1" | "a2" | "b1";
} {
  const score = PLACEMENT_QUESTIONS.filter(
    (q) => answers[q.id] === q.correct_answer
  ).length;

  const level = score <= 6 ? "a1" : score <= 13 ? "a2" : "b1";
  return { score, level };
}
