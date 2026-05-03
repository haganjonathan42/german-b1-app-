"use client";

import { useState, useRef } from "react";
import { conjugate } from "@/data/verbs";
import { cn } from "@/lib/utils";
import type { ConjugationResult } from "@/data/verbs";

type Tab = "dictionary" | "verbs";

const PRONOUNS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"] as const;

// ── Dictionary ───────────────────────────────────────────────────────────────

interface TranslationResult {
  translation: string;
  match: number; // 0–1 confidence
  alternatives: string[];
}

async function translate(word: string): Promise<TranslationResult> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=de|en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Translation service unavailable");
  const data = await res.json();
  const main: string = data.responseData?.translatedText ?? "";
  const match: number = data.responseData?.match ?? 0;
  const alternatives: string[] = (data.matches ?? [])
    .filter((m: { segment?: string; translation?: string; match?: number }) => m.segment?.toLowerCase() === word.toLowerCase())
    .map((m: { translation?: string }) => m.translation ?? "")
    .filter((t: string) => t && t !== main)
    .slice(0, 4);
  return { translation: main, match, alternatives };
}

// ── Component ────────────────────────────────────────────────────────────────

export default function ToolsPage() {
  const [tab, setTab] = useState<Tab>("dictionary");

  // Dictionary state
  const [dictInput, setDictInput] = useState("");
  const [dictResult, setDictResult] = useState<TranslationResult | null>(null);
  const [dictLoading, setDictLoading] = useState(false);
  const [dictError, setDictError] = useState("");
  const dictTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Verb state
  const [verbInput, setVerbInput] = useState("");
  const [verbResult, setVerbResult] = useState<ConjugationResult | null>(null);
  const [verbError, setVerbError] = useState("");
  const [openTense, setOpenTense] = useState<"present" | "prateritum" | "perfekt">("present");

  // ── Dictionary handlers ────────────────────────────────────────────────────

  function handleDictInput(value: string) {
    setDictInput(value);
    setDictError("");
    if (dictTimer.current) clearTimeout(dictTimer.current);
    if (!value.trim()) { setDictResult(null); return; }
    dictTimer.current = setTimeout(() => lookupWord(value.trim()), 600);
  }

  async function lookupWord(word: string) {
    setDictLoading(true);
    setDictError("");
    try {
      const result = await translate(word);
      if (!result.translation || result.translation.toLowerCase() === word.toLowerCase()) {
        setDictError("No translation found. Check the spelling.");
        setDictResult(null);
      } else {
        setDictResult(result);
      }
    } catch {
      setDictError("Could not reach the translation service. Check your connection.");
    } finally {
      setDictLoading(false);
    }
  }

  // ── Verb handlers ──────────────────────────────────────────────────────────

  function handleVerbLookup() {
    setVerbError("");
    const result = conjugate(verbInput.trim());
    if (!result) {
      setVerbError("Please enter a German verb infinitive (e.g. lernen, sein, aufstehen).");
      setVerbResult(null);
      return;
    }
    setVerbResult(result);
    setOpenTense("present");
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Language Tools</h1>
        <p className="text-slate-500 mt-1">
          German–English dictionary & verb conjugation — powered by open-source data
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["dictionary", "verbs"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-5 py-2.5 rounded-xl text-sm font-semibold transition",
              tab === t
                ? "bg-yellow-400 text-slate-900"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {t === "dictionary" ? "📖 Dictionary" : "🔀 Verb Conjugation"}
          </button>
        ))}
      </div>

      {/* ── DICTIONARY ─────────────────────────────────────────────────────── */}
      {tab === "dictionary" && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <p className="text-sm text-blue-700">
              Type any German word to get the English translation. Powered by{" "}
              <strong>MyMemory</strong> — a free, open-source translation memory.
            </p>
          </div>

          {/* Search input */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              German word or phrase
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={dictInput}
                onChange={(e) => handleDictInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && dictInput.trim() && lookupWord(dictInput.trim())}
                placeholder="z.B. Arbeit, ich lerne, guten Morgen…"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-base outline-none focus:border-yellow-400 transition"
                autoFocus
              />
              <button
                onClick={() => dictInput.trim() && lookupWord(dictInput.trim())}
                disabled={!dictInput.trim() || dictLoading}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-5 py-3 rounded-xl transition disabled:opacity-40"
              >
                {dictLoading ? "…" : "Translate"}
              </button>
            </div>
          </div>

          {/* Result */}
          {dictLoading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
              Looking up translation…
            </div>
          )}

          {dictError && !dictLoading && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-sm text-red-700">
              {dictError}
            </div>
          )}

          {dictResult && !dictLoading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              {/* Main translation */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                      German
                    </p>
                    <p className="text-2xl font-bold text-slate-900">{dictInput.trim()}</p>
                  </div>
                  <div className="text-slate-300 text-3xl mt-1 shrink-0">→</div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                      English
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">{dictResult.translation}</p>
                  </div>
                </div>
                {dictResult.match > 0 && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full">
                        <div
                          className={cn(
                            "h-1.5 rounded-full",
                            dictResult.match >= 0.8 ? "bg-green-400" : dictResult.match >= 0.5 ? "bg-yellow-400" : "bg-slate-300"
                          )}
                          style={{ width: `${Math.round(dictResult.match * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">
                        {Math.round(dictResult.match * 100)}% match
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tip: check if verb */}
              {dictInput.trim().toLowerCase().endsWith("en") && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-sm text-amber-800 flex items-center gap-2">
                  <span>💡</span>
                  <span>
                    This looks like a verb — switch to the{" "}
                    <button
                      onClick={() => { setVerbInput(dictInput.trim().toLowerCase()); setTab("verbs"); }}
                      className="font-semibold underline underline-offset-2"
                    >
                      Verb Conjugation
                    </button>{" "}
                    tab to see all forms.
                  </span>
                </div>
              )}

              {/* Alternatives */}
              {dictResult.alternatives.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Other translations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {dictResult.alternatives.map((alt) => (
                      <span
                        key={alt}
                        className="bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full"
                      >
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick lookup examples */}
          {!dictResult && !dictLoading && !dictError && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-500 mb-3">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {["Arbeit", "lernen", "Krankenhaus", "trotzdem", "Ausbildung", "eigentlich", "Wohnung", "Feierabend"].map((w) => (
                  <button
                    key={w}
                    onClick={() => { setDictInput(w); handleDictInput(w); }}
                    className="bg-slate-100 hover:bg-yellow-50 hover:border-yellow-300 border border-slate-200 text-slate-700 text-sm px-3 py-1.5 rounded-xl transition"
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── VERB CONJUGATION ──────────────────────────────────────────────── */}
      {tab === "verbs" && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
            <p className="text-sm text-amber-700">
              Enter any German verb in its infinitive form (e.g. <strong>lernen</strong>,{" "}
              <strong>sein</strong>, <strong>aufstehen</strong>). Regular and irregular verbs are
              both supported — separable verbs too.
            </p>
          </div>

          {/* Input */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Verb infinitive
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={verbInput}
                onChange={(e) => setVerbInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleVerbLookup()}
                placeholder="z.B. lernen, sein, aufstehen, können…"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-base outline-none focus:border-yellow-400 transition"
              />
              <button
                onClick={handleVerbLookup}
                disabled={!verbInput.trim()}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-5 py-3 rounded-xl transition disabled:opacity-40"
              >
                Conjugate
              </button>
            </div>
            {verbError && (
              <p className="text-sm text-red-600 mt-2">{verbError}</p>
            )}
          </div>

          {/* Quick verb buttons */}
          {!verbResult && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <p className="text-sm font-semibold text-slate-500 mb-3">Common verbs:</p>
              <div className="flex flex-wrap gap-2">
                {["sein", "haben", "werden", "können", "gehen", "kommen", "machen", "sprechen", "lernen", "arbeiten", "fahren", "essen", "schlafen", "aufstehen"].map((v) => (
                  <button
                    key={v}
                    onClick={() => { setVerbInput(v); setTimeout(() => { const r = conjugate(v); setVerbResult(r); setOpenTense("present"); }, 0); }}
                    className="bg-slate-100 hover:bg-yellow-50 hover:border-yellow-300 border border-slate-200 text-slate-700 text-sm px-3 py-1.5 rounded-xl transition"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conjugation result */}
          {verbResult && (
            <div className="space-y-4">
              {/* Header */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900">{verbResult.infinitive}</h2>
                    {verbResult.english && (
                      <p className="text-yellow-600 font-semibold mt-0.5">{verbResult.english}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full",
                      verbResult.isIrregular
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    )}>
                      {verbResult.isIrregular ? "Irregular" : "Regular"}
                    </span>
                    <span className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full",
                      verbResult.auxiliary === "sein"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-slate-100 text-slate-600"
                    )}>
                      Perfekt with <strong>{verbResult.auxiliary}</strong>
                    </span>
                    {verbResult.separablePrefix && (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                        Separable ({verbResult.separablePrefix}-)
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Partizip II:</span>
                  <span className="font-bold text-slate-900">{verbResult.partizip2}</span>
                  <span className="text-slate-400 text-xs ml-1">
                    (used in Perfekt & Plusquamperfekt)
                  </span>
                </div>
              </div>

              {/* Tense selector */}
              <div className="flex gap-2">
                {(["present", "prateritum", "perfekt"] as const).map((tense) => (
                  <button
                    key={tense}
                    onClick={() => setOpenTense(tense)}
                    className={cn(
                      "flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition",
                      openTense === tense
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {tense === "present" ? "Präsens" : tense === "prateritum" ? "Präteritum" : "Perfekt"}
                    <span className="block text-xs font-normal opacity-60">
                      {tense === "present" ? "Present" : tense === "prateritum" ? "Simple past" : "Perfect"}
                    </span>
                  </button>
                ))}
              </div>

              {/* Conjugation table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <p className="text-sm font-semibold text-slate-600">
                    {openTense === "present"
                      ? "Präsens — Present Tense"
                      : openTense === "prateritum"
                      ? "Präteritum — Simple Past (written/narrative)"
                      : `Perfekt — Perfect Tense (spoken past, with ${verbResult.auxiliary})`}
                  </p>
                </div>
                <div className="divide-y divide-slate-100">
                  {PRONOUNS.map((pronoun) => {
                    const form = verbResult[openTense][pronoun];
                    const isFirst = pronoun === "ich";
                    return (
                      <div
                        key={pronoun}
                        className={cn(
                          "flex items-center gap-4 px-6 py-3",
                          isFirst && "bg-yellow-50"
                        )}
                      >
                        <span className="w-20 text-sm font-semibold text-slate-500 shrink-0">
                          {pronoun}
                        </span>
                        <span className={cn(
                          "text-base font-bold",
                          isFirst ? "text-yellow-700" : "text-slate-900"
                        )}>
                          {form}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Separable note */}
              {verbResult.separablePrefix && openTense === "present" && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-sm text-orange-800">
                  <p className="font-semibold mb-1">💡 Separable verb note</p>
                  <p>
                    In main clauses the prefix <strong>{verbResult.separablePrefix}-</strong> splits
                    off and goes to the end: e.g. &ldquo;Ich{" "}
                    {verbResult.present.ich.split(" ")[0]} jeden Morgen{" "}
                    {verbResult.separablePrefix}.&rdquo;
                  </p>
                </div>
              )}

              {/* Try another */}
              <button
                onClick={() => { setVerbResult(null); setVerbInput(""); }}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition text-sm"
              >
                ← Look up another verb
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
