import type { CurriculumPhase } from "@/types";

// ── A1 Phases ──────────────────────────────────────────────────────────
const A1_PHASES: CurriculumPhase[] = [
  {
    id: 1,
    title: "Phase 1",
    subtitle: "First Steps",
    months: "Weeks 1–4",
    level: "A1",
    goal: "Introduce yourself, understand basic greetings, and use the present tense",
    grammarTopics: [
      "Alphabet & pronunciation",
      "Verb sein (to be) — all forms",
      "Verb haben (to have) — all forms",
      "Regular present tense (-en verbs)",
      "Personal pronouns (ich/du/er/sie/wir/ihr/sie/Sie)",
    ],
    vocabThemes: [
      "Greetings & introductions",
      "Numbers 1–100",
      "Colors & shapes",
      "Days & months",
    ],
    resources: ["DW Nicos Weg (Episodes 1–10)", "Anki A1 starter deck", "Schubert Verlag A1 exercises"],
    color: "green",
  },
  {
    id: 2,
    title: "Phase 2",
    subtitle: "Building Blocks",
    months: "Weeks 5–8",
    level: "A1",
    goal: "Ask and answer simple questions, understand basic texts",
    grammarTopics: [
      "W-questions (Wer/Was/Wo/Wann/Wie/Warum)",
      "Nominative articles (der/die/das/ein/eine)",
      "Negation (nicht / kein)",
      "Plural nouns",
      "Basic sentence word order (SVO)",
    ],
    vocabThemes: [
      "Family members",
      "Food & drink",
      "The home & rooms",
      "Body parts & health",
    ],
    resources: ["DW Nicos Weg (Episodes 11–20)", "Anki A1 deck (continue)", "Easy German (beginner episodes)"],
    color: "green",
  },
];

// ── A2 Phases ──────────────────────────────────────────────────────────
const A2_PHASES: CurriculumPhase[] = [
  {
    id: 1,
    title: "Phase 1",
    subtitle: "Past & Action",
    months: "Weeks 1–4",
    level: "A2",
    goal: "Talk about past events and handle everyday transactions",
    grammarTopics: [
      "Perfekt with haben (regular verbs)",
      "Perfekt with haben (irregular verbs)",
      "Perfekt with sein (movement/state verbs)",
      "Partizip II formation rules",
      "Accusative case (den/einen)",
    ],
    vocabThemes: [
      "Daily routine & time",
      "Shopping & money",
      "Transport & directions",
      "Weather & seasons",
    ],
    resources: ["DW Nicos Weg (Episodes 21–40)", "Schubert Verlag A2 exercises", "Anki A2 deck"],
    color: "yellow",
  },
  {
    id: 2,
    title: "Phase 2",
    subtitle: "Modals & Movement",
    months: "Weeks 5–8",
    level: "A2",
    goal: "Express ability, obligation, and permission. Use separable verbs naturally",
    grammarTopics: [
      "Modal verbs (können/müssen/wollen)",
      "Modal verbs (dürfen/sollen/mögen/möchten)",
      "Separable verbs (aufstehen/anrufen/mitnehmen)",
      "Dative case introduction (dem/der/einem/einer)",
      "Prepositions with accusative (durch/für/gegen/ohne/um)",
    ],
    vocabThemes: [
      "Work & professions",
      "Hobbies & free time",
      "Clothing & appearance",
      "City & neighbourhood",
    ],
    resources: ["Easy German YouTube (A2 episodes)", "Tandem app (start)", "Slow German Podcast"],
    color: "yellow",
  },
  {
    id: 3,
    title: "Phase 3",
    subtitle: "Description & Comparison",
    months: "Weeks 9–12",
    level: "A2",
    goal: "Describe people and places in detail, compare things, and use two-way prepositions",
    grammarTopics: [
      "Adjective endings (nominative & accusative)",
      "Comparatives (größer als)",
      "Superlatives (am größten)",
      "Prepositions with dative (mit/zu/bei/von/aus/nach/seit)",
      "Two-way prepositions (an/auf/in/über/unter/vor/hinter/neben/zwischen)",
    ],
    vocabThemes: [
      "Nature & environment",
      "Travel & holidays",
      "Food & restaurants (extended)",
      "Technology basics",
    ],
    resources: ["DW Learn German (Text Exercises)", "Schubert Verlag (prepositions)", "HiNative (first writing)"],
    color: "yellow",
  },
  {
    id: 4,
    title: "Phase 4",
    subtitle: "Connecting Ideas",
    months: "Weeks 13–16",
    level: "A2",
    goal: "Build complex sentences, give instructions, and talk about the past fluently",
    grammarTopics: [
      "Imperative (du/ihr/Sie forms)",
      "Präteritum of sein & haben",
      "Präteritum of modal verbs",
      "Subordinate clauses with weil & dass",
      "Subordinate clauses with wenn & ob",
    ],
    vocabThemes: [
      "Health & the body (extended)",
      "School & education",
      "Media & news",
      "Social life & invitations",
    ],
    resources: ["Easy German YouTube", "Tandem app (continue)", "ARD Mediathek (logo! news)"],
    color: "yellow",
  },
];

// ── B1 Phases (existing 5 phases) ─────────────────────────────────────
const B1_PHASES: CurriculumPhase[] = [
  {
    id: 1,
    title: "Phase 1",
    subtitle: "A2 → B1 Foundation",
    months: "Months 1–2",
    level: "A2 → B1",
    goal: "Survive daily life conversations and master the grammar backbone",
    grammarTopics: [
      "Present tense verb conjugation",
      "Perfect tense (Perfekt)",
      "Modal verbs (können, müssen, wollen, dürfen, sollen, mögen)",
      "Nominative and Accusative cases",
      "Negation (nicht and kein)",
      "Basic prepositions and time expressions",
      "Questions and verb-second rule",
    ],
    vocabThemes: [
      "Personal information",
      "Family",
      "Home and housing",
      "Daily routine",
      "Work and job",
      "Health",
      "Transport",
      "Food and drink",
    ],
    resources: ["DW Nicos Weg (Episodes 1–30)", "Anki Phase 1 deck", "Langsam Gesprochene Nachrichten", "Schubert Verlag A2 exercises"],
    color: "green",
  },
  {
    id: 2,
    title: "Phase 2",
    subtitle: "A2 Bridge",
    months: "Months 3–4",
    level: "A2",
    goal: "Hold 5-minute conversations confidently, build real sentence complexity",
    grammarTopics: [
      "Dative case",
      "Subordinate clauses (weil, dass, wenn, obwohl, ob)",
      "Präteritum of sein, haben, and modals",
      "Separable verbs",
      "Adjective endings (introduction)",
      "Two-way prepositions (introduction)",
      "Expressing opinions",
    ],
    vocabThemes: [
      "Opinions and feelings",
      "Shopping and money",
      "Appointments and communication",
      "Conjunctions and connectors",
    ],
    resources: ["DW Nicos Weg (Episodes 31–60)", "Easy German YouTube", "Tandem app (start)", "HiNative (first writing submission)"],
    color: "yellow",
  },
  {
    id: 3,
    title: "Phase 3",
    subtitle: "B1 Core",
    months: "Months 5–8",
    level: "A2 → B1",
    goal: "Build all four B1 skills simultaneously",
    grammarTopics: [
      "Adjective endings (complete)",
      "Konjunktiv II (würde, könnte, wäre, hätte)",
      "Passive voice",
      "Two-way prepositions (complete)",
      "Infinitive constructions (um…zu, ohne…zu, statt…zu)",
      "Relative clauses",
      "Indirect questions",
    ],
    vocabThemes: [
      "Health (B1)",
      "Housing (B1)",
      "Work and career (B1)",
      "Environment and society",
      "Opinion and argumentation",
      "Media and technology",
    ],
    resources: ["Slow German Podcast", "Tagesschau (5 min/day)", "TELC mock exam (first attempt)", "Goethe-Institut exercises"],
    color: "orange",
  },
  {
    id: 4,
    title: "Phase 4",
    subtitle: "Exam Preparation",
    months: "Months 9–10",
    level: "B1",
    goal: "Score 60%+ on TELC B1 mock exams",
    grammarTopics: [
      "Relative clauses (consolidation)",
      "Indirect questions (consolidation)",
      "Genitiv case (recognition)",
      "Error correction focus",
    ],
    vocabThemes: [
      "Formal register phrases",
      "Discourse markers",
      "All TELC exam topics",
      "Idioms",
    ],
    resources: ["TELC Übungstest B1 (free PDF)", "Goethe B1 Modelltest", "Timed writing practice", "Tandem exam simulation"],
    color: "red",
  },
  {
    id: 5,
    title: "Phase 5",
    subtitle: "Final Polish",
    months: "Months 11–12",
    level: "B1+",
    goal: "Score 65%+ on mock exams, book and pass TELC B1",
    grammarTopics: ["Consolidation only — no new grammar"],
    vocabThemes: ["Exam topic vocabulary review"],
    resources: ["Full mock exams every 2 weeks", "Tandem exam simulation", "All exam prep materials"],
    color: "purple",
  },
];

// ── CURRICULUM_BY_LEVEL — primary export ───────────────────────────────
export const CURRICULUM_BY_LEVEL: Record<
  "a1" | "a2" | "b1",
  { title: string; duration: string; description: string; phases: CurriculumPhase[] }
> = {
  a1: {
    title: "A1 — Complete Beginner",
    duration: "2 months",
    description: "Start from zero. Master basic greetings, present tense, and everyday vocabulary.",
    phases: A1_PHASES,
  },
  a2: {
    title: "A2 — Elementary",
    duration: "4 months",
    description: "Build on A1. Talk about the past, use modal verbs, and handle everyday situations.",
    phases: A2_PHASES,
  },
  b1: {
    title: "B1 — Intermediate",
    duration: "6 months",
    description: "Reach TELC B1. Master complex grammar, formal writing, and exam techniques.",
    phases: B1_PHASES,
  },
};

// Backwards-compatible alias
export const CURRICULUM_PHASES: CurriculumPhase[] = B1_PHASES;

export const PHASE_COLORS: Record<number, { bg: string; text: string; border: string; badge: string }> = {
  1: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", badge: "bg-green-100 text-green-800" },
  2: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", badge: "bg-yellow-100 text-yellow-800" },
  3: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", badge: "bg-orange-100 text-orange-800" },
  4: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", badge: "bg-red-100 text-red-800" },
  5: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", badge: "bg-purple-100 text-purple-800" },
};

export const LEVEL_COLORS: Record<"a1" | "a2" | "b1", { bg: string; text: string; border: string; badge: string; dot: string }> = {
  a1: { bg: "bg-green-50", text: "text-green-700", border: "border-green-300", badge: "bg-green-100 text-green-800", dot: "bg-green-500" },
  a2: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300", badge: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
  b1: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300", badge: "bg-blue-100 text-blue-800", dot: "bg-blue-500" },
};

export const LEVEL_LABELS: Record<"a1" | "a2" | "b1", string> = {
  a1: "A1 Beginner",
  a2: "A2 Elementary",
  b1: "B1 Intermediate",
};

export const DAILY_SCHEDULE = [
  { slot: "A", time: "20 min", activity: "Grammar or Writing study", icon: "📖" },
  { slot: "B", time: "20 min", activity: "Vocabulary — Anki flashcards", icon: "🃏" },
  { slot: "C", time: "20 min", activity: "Listening or Speaking practice", icon: "🎧" },
];

export const EXAM_READINESS_CHECKLIST = [
  "Speak for 2 minutes on an unfamiliar topic without switching to English",
  "Write a formal email (100 words) in under 15 minutes",
  "Score 60%+ on two consecutive TELC B1 mock exams",
  "Understand the main point of a 3-minute German radio clip",
];
