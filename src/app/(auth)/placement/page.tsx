"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PLACEMENT_QUESTIONS, scorePlacement } from "@/data/placement";
import { cn } from "@/lib/utils";
import type { Level } from "@/types";

type Screen = "intro" | "test" | "result";

const LEVEL_INFO: Record<Level, { label: string; emoji: string; color: string; description: string }> = {
  a1: {
    label: "A1 — Complete Beginner",
    emoji: "🌱",
    color: "text-green-600",
    description: "You're starting your German journey from the beginning. Perfect — everyone starts here! You'll build a solid foundation step by step.",
  },
  a2: {
    label: "A2 — Elementary",
    emoji: "🌿",
    color: "text-amber-600",
    description: "You already know some German basics. You'll start at A2 to build on what you know and move confidently toward B1.",
  },
  b1: {
    label: "B1 — Intermediate",
    emoji: "🌳",
    color: "text-blue-600",
    description: "Great — you have a solid German foundation. You'll jump straight into B1 preparation and work toward your TELC exam.",
  },
};

export default function PlacementPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>("intro");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; level: Level } | null>(null);
  const [saving, setSaving] = useState(false);

  function handleSelect(questionId: string, answer: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  async function handleSubmit() {
    const placement = scorePlacement(answers);
    setResult(placement);
    setScreen("result");
    await saveLevel(placement.level);
  }

  async function handleSkip() {
    await saveLevel("a1");
    router.push("/dashboard");
    router.refresh();
  }

  async function saveLevel(level: Level) {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ current_level: level, placement_completed: true })
        .eq("id", user.id);
    }
    setSaving(false);
  }

  function handleStartLearning() {
    router.push("/dashboard");
    router.refresh();
  }

  const allAnswered = Object.keys(answers).length === PLACEMENT_QUESTIONS.length;

  // ── Intro Screen ───────────────────────────────────────────────────
  if (screen === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <span className="text-5xl">🇩🇪</span>
            <h1 className="text-3xl font-bold text-white mt-4 mb-2">Welcome to Deutsch B1</h1>
            <p className="text-slate-400">Let&apos;s find the right starting point for you</p>
            <div className="flex justify-center gap-1 mt-3">
              <div className="h-1 w-8 bg-black rounded" />
              <div className="h-1 w-8 bg-red-600 rounded" />
              <div className="h-1 w-8 bg-yellow-400 rounded" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Placement Test</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Answer 20 quick grammar questions and we&apos;ll place you at the right level —
                A1, A2, or B1. It takes about 5 minutes.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">A1 — Complete Beginner</p>
                  <p className="text-slate-500 text-xs">Start from zero — alphabet to basic sentences</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-2xl">🌿</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">A2 — Elementary</p>
                  <p className="text-slate-500 text-xs">You know some basics — expand to everyday fluency</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <span className="text-2xl">🌳</span>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">B1 — Intermediate</p>
                  <p className="text-slate-500 text-xs">Solid foundation — prepare for TELC B1 exam</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => setScreen("test")}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3.5 rounded-xl transition"
              >
                Take the Placement Test (5 min)
              </button>
              <button
                onClick={handleSkip}
                disabled={saving}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold py-3 rounded-xl transition text-sm disabled:opacity-50"
              >
                Skip — Start at A1 (Complete Beginner)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Result Screen ──────────────────────────────────────────────────
  if (screen === "result" && result) {
    const info = LEVEL_INFO[result.level];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-6xl mb-4">{info.emoji}</div>
            <p className="text-slate-500 text-sm mb-1">Your placement result</p>
            <h2 className={cn("text-3xl font-black mb-3", info.color)}>{info.label}</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{info.description}</p>
            <div className="bg-slate-100 rounded-xl px-4 py-2 inline-block mb-6">
              <span className="text-slate-500 text-xs">Score: </span>
              <span className="font-bold text-slate-900">{result.score} / 20 correct</span>
            </div>
            <button
              onClick={handleStartLearning}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3.5 rounded-xl transition"
            >
              Start Learning →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Test Screen ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇩🇪</span>
            <span className="text-white font-bold text-sm">Placement Test</span>
          </div>
          <span className="text-slate-400 text-sm">
            {Object.keys(answers).length} / {PLACEMENT_QUESTIONS.length} answered
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-4">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <p className="text-sm text-blue-700">
            Answer all 20 questions. There&apos;s no time limit — take your time.
            The test covers A1, A2, and B1 topics to find your exact level.
          </p>
        </div>

        {PLACEMENT_QUESTIONS.map((q, idx) => {
          const selected = answers[q.id];
          return (
            <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 shrink-0">
                  {idx + 1}
                </span>
                <p className="font-medium text-slate-900">{q.question}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-10">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(q.id, option)}
                    className={cn(
                      "text-left px-4 py-3 rounded-xl border text-sm transition",
                      selected === option
                        ? "border-yellow-400 bg-yellow-50 font-medium"
                        : "border-slate-200 hover:border-yellow-300 hover:bg-yellow-50"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        <button
          onClick={handleSubmit}
          disabled={!allAnswered || saving}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 rounded-2xl transition disabled:opacity-40 disabled:cursor-not-allowed sticky bottom-4"
        >
          {saving ? "Saving..." : `Submit Test (${Object.keys(answers).length}/${PLACEMENT_QUESTIONS.length} answered)`}
        </button>
      </div>
    </div>
  );
}
