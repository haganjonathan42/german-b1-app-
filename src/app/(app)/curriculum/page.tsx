"use client";

import { useState, useEffect } from "react";
import { CURRICULUM_BY_LEVEL, PHASE_COLORS, LEVEL_COLORS, LEVEL_LABELS } from "@/data/curriculum";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Level } from "@/types";

const LEVELS: Level[] = ["a1", "a2", "b1"];

export default function CurriculumPage() {
  const [selectedLevel, setSelectedLevel] = useState<Level>("a1");

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
          setSelectedLevel(profile.current_level as Level);
        }
      }
    }
    fetchLevel();
  }, []);

  const levelData = CURRICULUM_BY_LEVEL[selectedLevel];
  const levelColors = LEVEL_COLORS[selectedLevel];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Curriculum</h1>
        <p className="text-slate-500 mt-1">
          Your structured learning path — designed by Dr. Sabine Richter
        </p>
      </div>

      {/* Level tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 flex gap-2">
        {LEVELS.map((level) => {
          const lc = LEVEL_COLORS[level];
          return (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={cn(
                "flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition",
                selectedLevel === level
                  ? `${lc.bg} ${lc.text} ${lc.border} border`
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              {CURRICULUM_BY_LEVEL[level].title.split(" — ")[0]}
              <span className="block text-xs font-normal opacity-70">{CURRICULUM_BY_LEVEL[level].duration}</span>
            </button>
          );
        })}
      </div>

      {/* Level overview */}
      <div className={cn("rounded-2xl border p-6", levelColors.bg, levelColors.border)}>
        <h2 className={cn("font-bold text-xl mb-1", levelColors.text)}>{levelData.title}</h2>
        <p className="text-slate-600 text-sm">{levelData.description}</p>
        <div className="mt-3 flex gap-4 text-sm">
          <div>
            <span className="text-slate-500">Duration: </span>
            <span className="font-semibold text-slate-900">{levelData.duration}</span>
          </div>
          <div>
            <span className="text-slate-500">Phases: </span>
            <span className="font-semibold text-slate-900">{levelData.phases.length}</span>
          </div>
        </div>
      </div>

      {/* Daily structure */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-3">Daily 1-Hour Structure</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { slot: "A", time: "20 min", desc: "Grammar or Writing", icon: "📖" },
            { slot: "B", time: "20 min", desc: "Vocabulary (Anki)", icon: "🃏" },
            { slot: "C", time: "20 min", desc: "Listening or Speaking", icon: "🎧" },
          ].map((s) => (
            <div key={s.slot} className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center">
              <span className="text-2xl">{s.icon}</span>
              <p className="font-bold text-slate-900 mt-2">Slot {s.slot}</p>
              <p className="text-yellow-700 font-semibold text-sm">{s.time}</p>
              <p className="text-slate-500 text-xs mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phase timeline */}
      <div className="space-y-4">
        <h2 className="font-bold text-slate-900 text-xl">
          {selectedLevel.toUpperCase()} Phases ({levelData.phases.length} phases)
        </h2>

        {levelData.phases.map((phase, idx) => {
          const colors = PHASE_COLORS[(idx % 5) + 1];
          return (
            <div
              key={`${selectedLevel}-${phase.id}`}
              className={`rounded-2xl border p-6 ${colors.bg} ${colors.border}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.badge}`}>
                      {phase.months}
                    </span>
                    <span className={`text-xs font-semibold ${colors.text}`}>{phase.level}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {phase.title}: {phase.subtitle}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">{phase.goal}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Grammar Topics
                  </p>
                  <ul className="space-y-1">
                    {phase.grammarTopics.map((t) => (
                      <li key={t} className="text-sm text-slate-600 flex items-start gap-1.5">
                        <span className={`mt-0.5 shrink-0 ${colors.text}`}>•</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Vocabulary Themes
                  </p>
                  <ul className="space-y-1">
                    {phase.vocabThemes.map((t) => (
                      <li key={t} className="text-sm text-slate-600 flex items-start gap-1.5">
                        <span className="mt-0.5 shrink-0 text-slate-400">•</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Key Resources
                  </p>
                  <ul className="space-y-1">
                    {phase.resources.map((r) => (
                      <li key={r} className="text-sm text-slate-600 flex items-start gap-1.5">
                        <span className="mt-0.5 shrink-0 text-slate-400">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Exam readiness (B1 only) */}
      {selectedLevel === "b1" && (
        <div className="bg-slate-900 rounded-2xl p-6 text-white">
          <h2 className="font-bold text-lg mb-3">When to Book the Exam</h2>
          <p className="text-slate-400 text-sm mb-4">Book your TELC B1 when all three are true:</p>
          <div className="space-y-2">
            {[
              "Score 60%+ on two consecutive full TELC B1 mock exams",
              "Write a formal email (100 words) in under 15 minutes",
              "Speak for 2 minutes on an unfamiliar topic without switching to English",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm">
                <span className="text-yellow-400 mt-0.5 shrink-0">✓</span>
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
          <a
            href="https://www.telc.net"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-yellow-500 transition"
          >
            Find TELC Exam Centre →
          </a>
        </div>
      )}

      {/* Expert team */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">Your Expert Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: "Dr. Sabine Richter", role: "Curriculum Architect", icon: "👩‍🏫", years: "28 years" },
            { name: "Thomas Becker", role: "Grammar Expert", icon: "📐", years: "22 years" },
            { name: "Layla Hassan", role: "Assignment Grader", icon: "📋", years: "14 years" },
            { name: "Klaus Meyer", role: "Speaking Coach", icon: "🎭", years: "20 years" },
            { name: "Anna Schulz", role: "Writing Coach", icon: "✒️", years: "15 years" },
            { name: "Daniel Weber", role: "Resources Specialist", icon: "💻", years: "11 years" },
          ].map((agent) => (
            <div key={agent.name} className="bg-slate-50 rounded-xl p-4 text-sm">
              <span className="text-2xl">{agent.icon}</span>
              <p className="font-semibold text-slate-900 mt-2">{agent.name}</p>
              <p className="text-slate-500 text-xs">{agent.role}</p>
              <p className="text-yellow-600 text-xs mt-1">{agent.years} experience</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
