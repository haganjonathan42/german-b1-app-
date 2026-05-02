import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getPhaseLabel(phase: number): string {
  const labels: Record<number, string> = {
    1: "Phase 1 — A2 Foundation",
    2: "Phase 2 — A2→B1 Bridge",
    3: "Phase 3 — B1 Core",
    4: "Phase 4 — Exam Preparation",
    5: "Phase 5 — Final Polish",
  };
  return labels[phase] ?? "Unknown Phase";
}

export function getPhaseMonths(phase: number): string {
  const months: Record<number, string> = {
    1: "Months 1–2",
    2: "Months 3–4",
    3: "Months 5–8",
    4: "Months 9–10",
    5: "Months 11–12",
  };
  return months[phase] ?? "";
}

export function scoreToGrade(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Excellent", color: "text-green-600" };
  if (score >= 70) return { label: "Good", color: "text-blue-600" };
  if (score >= 60) return { label: "Pass", color: "text-yellow-600" };
  return { label: "Needs Work", color: "text-red-600" };
}
