"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { WRITING_PROMPTS } from "@/data/exercises";
import { cn } from "@/lib/utils";
import type { WritingEntry } from "@/types";

const REGISTER_LABELS: Record<string, string> = {
  formal: "Formal (Sie)",
  informal: "Informal (du)",
  neutral: "Neutral",
};

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  informal: { label: "Informal Email", color: "bg-blue-100 text-blue-700" },
  complaint: { label: "Complaint Letter", color: "bg-red-100 text-red-700" },
  enquiry: { label: "Enquiry Letter", color: "bg-green-100 text-green-700" },
  opinion: { label: "Opinion Text", color: "bg-purple-100 text-purple-700" },
  free: { label: "Free Writing", color: "bg-slate-100 text-slate-600" },
};

export default function WritingPage() {
  const [view, setView] = useState<"prompts" | "editor" | "saved">("prompts");
  const [selectedPrompt, setSelectedPrompt] = useState<(typeof WRITING_PROMPTS)[0] | null>(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selfScore, setSelfScore] = useState<number | null>(null);
  const [showModel, setShowModel] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedEntries, setSavedEntries] = useState<WritingEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  // Timer
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerLimit] = useState(12 * 60); // 12 minutes

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  async function loadSavedEntries() {
    setLoadingEntries(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("writing_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setSavedEntries(data ?? []);
    setLoadingEntries(false);
  }

  async function saveEntry() {
    if (!content.trim()) return;
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const entry = {
      user_id: user.id,
      title: title || (selectedPrompt?.title ?? "Untitled"),
      prompt: selectedPrompt?.scenario ?? "",
      content,
      word_count: wordCount,
      self_score: selfScore,
      phase: selectedPrompt?.phase ?? 1,
      week_number: selectedPrompt?.week ?? 1,
      writing_type: selectedPrompt?.type ?? "free",
    };

    await supabase.from("writing_entries").insert(entry);

    // Also record completion
    await supabase.from("assignment_completions").insert({
      user_id: user.id,
      assignment_type: "writing",
      week_number: selectedPrompt?.week ?? 1,
      phase: selectedPrompt?.phase ?? 1,
      score: selfScore,
    });

    setSaveMessage("Saved!");
    setSaving(false);
    setTimeout(() => setSaveMessage(""), 3000);
  }

  function startEditor(prompt: (typeof WRITING_PROMPTS)[0]) {
    setSelectedPrompt(prompt);
    setContent("");
    setTitle(prompt.title);
    setShowModel(false);
    setSelfScore(null);
    setTimerSeconds(0);
    setTimerActive(false);
    setView("editor");
  }

  const timerMin = Math.floor(timerSeconds / 60);
  const timerSec = timerSeconds % 60;
  const timerPct = Math.min((timerSeconds / timerLimit) * 100, 100);
  const timerWarning = timerSeconds >= timerLimit * 0.8;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Writing Practice</h1>
          <p className="text-slate-500 mt-1">Emails, letters, and opinion texts — guided by Anna Schulz</p>
        </div>
        <div className="flex gap-2">
          {(["prompts", "editor", "saved"] as const).map((v) => (
            <button
              key={v}
              onClick={() => {
                setView(v);
                if (v === "saved") loadSavedEntries();
              }}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium capitalize transition",
                view === v ? "bg-yellow-400 text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {v === "prompts" ? "Prompts" : v === "editor" ? "Editor" : "Saved"}
            </button>
          ))}
        </div>
      </div>

      {/* PROMPTS VIEW */}
      {view === "prompts" && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <p className="text-sm font-semibold text-amber-800 mb-1">
              ✒️ Anna Schulz — Writing Coach
            </p>
            <p className="text-sm text-amber-700">
              Choose a prompt below to open the editor. In Phase 3+, use the 12-minute timer.
              Always attempt independently before checking the model answer.
            </p>
          </div>

          {WRITING_PROMPTS.map((prompt) => {
            const typeInfo = TYPE_LABELS[prompt.type];
            return (
              <div
                key={prompt.id}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      <span className="text-xs text-slate-400">Phase {prompt.phase} · Week {prompt.week}</span>
                      <span className="text-xs text-slate-400">~{prompt.wordTarget} words</span>
                    </div>
                    <h3 className="font-bold text-slate-900">{prompt.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{prompt.scenario}</p>
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Required points:
                      </p>
                      <ul className="space-y-0.5">
                        {prompt.requirements.map((req) => (
                          <li key={req} className="text-sm text-slate-600 flex items-start gap-1.5">
                            <span className="text-yellow-500 mt-0.5">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => startEditor(prompt)}
                    className="ml-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm transition shrink-0"
                  >
                    Write →
                  </button>
                </div>
              </div>
            );
          })}

          {/* Free writing */}
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 text-center">
            <span className="text-3xl">✍️</span>
            <h3 className="font-bold text-slate-900 mt-2">Free Writing</h3>
            <p className="text-slate-500 text-sm mt-1">Write anything in German — diary entry, story, reflection</p>
            <button
              onClick={() => {
                setSelectedPrompt(null);
                setContent("");
                setTitle("Free Writing");
                setShowModel(false);
                setSelfScore(null);
                setView("editor");
              }}
              className="mt-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-sm transition"
            >
              Open Editor
            </button>
          </div>
        </div>
      )}

      {/* EDITOR VIEW */}
      {view === "editor" && (
        <div className="space-y-4">
          {selectedPrompt && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_LABELS[selectedPrompt.type].color}`}>
                    {TYPE_LABELS[selectedPrompt.type].label}
                  </span>
                  <h3 className="font-bold text-slate-900 mt-2">{selectedPrompt.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{selectedPrompt.scenario}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedPrompt.requirements.map((req) => (
                      <span key={req} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Timer */}
                <div className="ml-4 text-right">
                  <div
                    className={cn(
                      "text-2xl font-mono font-bold",
                      timerWarning ? "text-red-600" : "text-slate-700"
                    )}
                  >
                    {String(timerMin).padStart(2, "0")}:{String(timerSec).padStart(2, "0")}
                  </div>
                  <div className="h-1.5 w-24 bg-slate-100 rounded-full mt-1 ml-auto">
                    <div
                      className={cn("h-1.5 rounded-full transition-all", timerWarning ? "bg-red-500" : "bg-yellow-400")}
                      style={{ width: `${timerPct}%` }}
                    />
                  </div>
                  <button
                    onClick={() => setTimerActive((t) => !t)}
                    className="mt-1.5 text-xs text-slate-500 hover:text-yellow-600 transition"
                  >
                    {timerActive ? "⏸ Pause" : "▶ Start 12-min timer"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Editor */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-100 px-4 py-3 flex items-center justify-between">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Entry title..."
                className="text-sm font-semibold text-slate-800 bg-transparent outline-none flex-1"
              />
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-lg",
                    wordCount < (selectedPrompt?.wordTarget ?? 80)
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-700"
                  )}
                >
                  {wordCount} words {selectedPrompt && `/ ${selectedPrompt.wordTarget} target`}
                </span>
                {selectedPrompt && (
                  <span className="text-xs text-slate-400">{REGISTER_LABELS[selectedPrompt.register ?? "formal"]}</span>
                )}
              </div>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Schreib dein Deutsch hier... (Write your German here...)"
              rows={14}
              className="w-full p-5 text-slate-800 text-base leading-relaxed resize-none outline-none font-mono"
            />
          </div>

          {/* Self-grade */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900 mb-3">Self-Grade (Optional)</h3>
            <p className="text-sm text-slate-500 mb-3">Rate your writing honestly (0–100)</p>
            <div className="flex gap-2 flex-wrap">
              {[40, 50, 60, 65, 70, 75, 80, 85, 90].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelfScore(selfScore === s ? null : s)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-sm font-medium transition",
                    selfScore === s
                      ? "bg-yellow-400 text-slate-900"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>

          {/* Model answer */}
          {selectedPrompt && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <button
                onClick={() => setShowModel((s) => !s)}
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-yellow-700 transition"
              >
                <span>{showModel ? "▼" : "▶"}</span>
                {showModel ? "Hide" : "Show"} Model Answer
              </button>
              {showModel && selectedPrompt.modelAnswer && (
                <pre className="mt-4 p-4 bg-green-50 rounded-xl text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed border border-green-100">
                  {selectedPrompt.modelAnswer}
                </pre>
              )}
            </div>
          )}

          {/* Save button */}
          <div className="flex gap-3">
            <button
              onClick={saveEntry}
              disabled={saving || !content.trim()}
              className="flex-1 bg-slate-900 text-white font-semibold py-3 rounded-2xl hover:bg-slate-800 transition disabled:opacity-40"
            >
              {saving ? "Saving..." : saveMessage || "Save Entry"}
            </button>
            <button
              onClick={() => setView("prompts")}
              className="px-5 py-3 bg-slate-100 text-slate-700 font-semibold rounded-2xl hover:bg-slate-200 transition"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* SAVED VIEW */}
      {view === "saved" && (
        <div className="space-y-4">
          {loadingEntries && (
            <div className="text-center py-12 text-slate-400">Loading entries...</div>
          )}
          {!loadingEntries && savedEntries.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-3">📝</p>
              <p>No saved entries yet. Write your first text!</p>
              <button
                onClick={() => setView("prompts")}
                className="mt-4 bg-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-xl text-sm"
              >
                Choose a Prompt
              </button>
            </div>
          )}
          {savedEntries.map((entry) => {
            const typeInfo = TYPE_LABELS[entry.writing_type] ?? TYPE_LABELS.free;
            return (
              <div key={entry.id} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                      {typeInfo.label}
                    </span>
                    <h3 className="font-bold text-slate-900 mt-1.5">{entry.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(entry.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })} · {entry.word_count} words
                      {entry.self_score !== null && ` · Score: ${entry.self_score}%`}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap line-clamp-4">
                  {entry.content}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
