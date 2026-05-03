"use client";

import { useState, useEffect } from "react";
import { GRAMMAR_EXERCISES } from "@/data/exercises";
import { LEVEL_LABELS } from "@/data/curriculum";
import { createClient } from "@/lib/supabase/client";
import { cn, getAccessibleLevels } from "@/lib/utils";
import { LevelTabs } from "@/components/LevelTabs";
import type { Level } from "@/types";

const WEEK_TOPICS: Record<string, string> = {
  // A1
  "a1-1": "sein, haben, regular present",
  "a1-2": "W-questions & nominative articles",
  // A2
  "a2-1": "Perfekt (past tense)",
  "a2-2": "Modal Verbs",
  // B1
  "b1-1": "Present Tense",
  "b1-2": "Modal Verbs",
  "b1-3": "Nominative & Accusative",
  "b1-4": "Perfect Tense (Perfekt)",
  "b1-5": "Negation",
  "b1-9": "Dative Case",
  "b1-10": "Subordinate Clauses",
};

export default function GrammarExercisePage() {
  const [userLevel, setUserLevel] = useState<Level>("a1");
  const [selectedLevel, setSelectedLevel] = useState<Level>("a1");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchLevel() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("current_level")
          .eq("id", user.id)
          .single();
        if (profile?.current_level) {
          const level = profile.current_level as Level;
          setUserLevel(level);
          setSelectedLevel(level);
        }
      }
    }
    fetchLevel();
  }, []);

  const levelExercises = GRAMMAR_EXERCISES.filter((q) => q.level === selectedLevel);
  const weeks = Array.from(new Set(levelExercises.map((q) => q.week))).sort((a, b) => a - b);
  const questions = levelExercises.filter((q) => q.week === selectedWeek);

  function handleLevelChange(level: Level) {
    if (!getAccessibleLevels(userLevel).includes(level)) return;
    setSelectedLevel(level);
    const newWeeks = Array.from(new Set(GRAMMAR_EXERCISES.filter((q) => q.level === level).map((q) => q.week))).sort((a, b) => a - b);
    setSelectedWeek(newWeeks[0] ?? 1);
    setAnswers({});
    setSubmitted(false);
    setSaved(false);
  }

  function handleSelect(questionId: string, answer: string) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  const correctCount = questions.filter((q) => answers[q.id] === q.correct_answer).length;
  const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  async function handleSubmit() {
    setSubmitted(true);
  }

  async function saveResult() {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("assignment_completions").insert({
      user_id: user.id,
      assignment_type: "grammar",
      week_number: selectedWeek,
      phase: 1,
      level: selectedLevel,
      score,
    });

    setSaved(true);
    setSaving(false);
  }

  function resetExercise() {
    setAnswers({});
    setSubmitted(false);
    setSaved(false);
  }

  const topicKey = `${selectedLevel}-${selectedWeek}`;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Grammar Exercises</h1>
        <p className="text-slate-500 mt-1">Interactive exercises designed by Thomas Becker</p>
      </div>

      {/* Level tabs */}
      <LevelTabs
        userLevel={userLevel}
        selectedLevel={selectedLevel}
        onSelect={handleLevelChange}
        countByLevel={{
          a1: GRAMMAR_EXERCISES.filter((q) => q.level === "a1").length,
          a2: GRAMMAR_EXERCISES.filter((q) => q.level === "a2").length,
          b1: GRAMMAR_EXERCISES.filter((q) => q.level === "b1").length,
        }}
        countLabel="questions"
      />

      {/* Week selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Select Week</h2>
        <div className="flex flex-wrap gap-2">
          {weeks.map((week) => (
            <button
              key={week}
              onClick={() => {
                setSelectedWeek(week);
                setAnswers({});
                setSubmitted(false);
                setSaved(false);
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition",
                selectedWeek === week
                  ? "bg-yellow-400 text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              Week {week}
              {WEEK_TOPICS[`${selectedLevel}-${week}`] && (
                <span className="ml-1.5 text-xs opacity-70">— {WEEK_TOPICS[`${selectedLevel}-${week}`]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grammar tip */}
      {questions[0] && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-sm font-semibold text-blue-800 mb-1">
            📐 Thomas Becker — {selectedLevel.toUpperCase()} Week {selectedWeek}
            {WEEK_TOPICS[topicKey] ? `: ${WEEK_TOPICS[topicKey]}` : ""}
          </p>
          <p className="text-sm text-blue-700">
            Complete all {questions.length} questions below. Check your answers after submitting.
            Aim for 70%+ to proceed confidently.
          </p>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, idx) => {
          const userAnswer = answers[q.id];
          const isCorrect = submitted && userAnswer === q.correct_answer;
          const isWrong = submitted && userAnswer && userAnswer !== q.correct_answer;

          return (
            <div
              key={q.id}
              className={cn(
                "bg-white rounded-2xl border p-6 transition",
                !submitted && "border-slate-200",
                submitted && isCorrect && "border-green-300 bg-green-50",
                submitted && isWrong && "border-red-300 bg-red-50",
                submitted && !userAnswer && "border-orange-200 bg-orange-50"
              )}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold text-slate-600 shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    {q.type === "multiple_choice" ? "Multiple Choice" : "Error Correction"}
                  </span>
                  <p className="font-medium text-slate-900 mt-2">{q.question}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-10">
                {q.options?.map((option) => {
                  const isSelected = userAnswer === option;
                  const isThisCorrect = submitted && option === q.correct_answer;
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(q.id, option)}
                      disabled={submitted}
                      className={cn(
                        "text-left px-4 py-3 rounded-xl border text-sm transition",
                        !submitted && !isSelected && "border-slate-200 hover:border-yellow-300 hover:bg-yellow-50",
                        !submitted && isSelected && "border-yellow-400 bg-yellow-50",
                        submitted && isThisCorrect && "border-green-400 bg-green-100 text-green-800 font-medium",
                        submitted && isSelected && !isThisCorrect && "border-red-300 bg-red-100 text-red-800",
                        submitted && !isSelected && !isThisCorrect && "border-slate-100 text-slate-400"
                      )}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {submitted && isCorrect && (
                <div className="mt-4 ml-10 p-3 rounded-xl text-sm bg-green-100 text-green-800">
                  <p className="font-semibold mb-1">✓ Correct!</p>
                  <p>{q.explanation}</p>
                </div>
              )}
              {submitted && isWrong && (
                <div className="mt-4 ml-10 p-3 rounded-xl text-sm bg-amber-50 text-amber-800">
                  <p className="font-semibold mb-1">✗ Not quite — here&apos;s a hint:</p>
                  <p>{q.hint}</p>
                </div>
              )}
              {submitted && !userAnswer && (
                <div className="mt-4 ml-10 p-3 rounded-xl text-sm bg-orange-50 text-orange-800">
                  <p className="font-semibold mb-1">⚠ Not answered</p>
                  <p>{q.hint}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit */}
      {!submitted && questions.length > 0 && (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 rounded-2xl transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit Answers ({Object.keys(answers).length}/{questions.length} answered)
        </button>
      )}

      {/* Results */}
      {submitted && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className={cn("text-5xl font-black mb-2",
            score >= 80 ? "text-green-600" : score >= 70 ? "text-blue-600" : score >= 60 ? "text-yellow-600" : "text-red-600"
          )}>
            {score}%
          </div>
          <p className="text-xl font-bold text-slate-900 mb-1">
            {score >= 80 ? "Ausgezeichnet! 🌟" : score >= 70 ? "Sehr gut! ✓" : score >= 60 ? "Bestanden ✓" : "Weiter üben 📚"}
          </p>
          <p className="text-slate-500 mb-6">
            {correctCount} of {questions.length} correct — {selectedLevel.toUpperCase()} Week {selectedWeek}
            {WEEK_TOPICS[topicKey] ? `, ${WEEK_TOPICS[topicKey]}` : ""}
          </p>
          <div className="flex justify-center gap-3">
            {!saved && (
              <button
                onClick={saveResult}
                disabled={saving}
                className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Result"}
              </button>
            )}
            {saved && (
              <span className="bg-green-100 text-green-700 font-semibold px-6 py-3 rounded-xl">
                ✓ Saved to progress
              </span>
            )}
            <button onClick={resetExercise} className="bg-slate-100 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:bg-slate-200 transition">
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
