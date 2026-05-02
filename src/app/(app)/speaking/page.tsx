"use client";

import { useState, useEffect } from "react";
import { SPEAKING_PROMPTS } from "@/data/exercises";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const TELC_TOPICS = [
  { topic: "Arbeit und Beruf", points: ["Your job", "Daily work routine", "Work-life balance"] },
  { topic: "Gesundheit", points: ["Health habits", "Recent illness", "German healthcare"] },
  { topic: "Familie", points: ["Your family", "Relationships", "What family means to you"] },
  { topic: "Wohnen", points: ["Where you live", "Your apartment", "Neighbourhood"] },
  { topic: "Freizeit & Hobbys", points: ["Hobbies", "How you relax", "Dream holiday"] },
  { topic: "Internet & Medien", points: ["How you use the internet", "Social media pros/cons", "Fake news"] },
  { topic: "Reisen", points: ["A journey you made", "Travel plans", "Germany vs your home country"] },
  { topic: "Umwelt", points: ["Climate change", "Your sustainable habits", "Government responsibility"] },
];

const OPINION_PHRASES = [
  "Ich denke, dass…",
  "Meiner Meinung nach…",
  "Ich bin der Meinung, dass…",
  "Ich finde, dass…",
  "Einerseits… andererseits…",
  "Das finde ich wichtig, weil…",
  "Ich stimme (nicht) zu, weil…",
];

const PLANNING_PHRASES = [
  "Ich schlage vor, dass wir…",
  "Wie wäre es mit…?",
  "Was meinen Sie?",
  "Einverstanden.",
  "Das klingt gut.",
  "Ich bin nicht sicher, ob…",
  "Könnten wir stattdessen…?",
];

export default function SpeakingPage() {
  const [activeTab, setActiveTab] = useState<"mirror" | "topics" | "exam">("mirror");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timerTarget, setTimerTarget] = useState(10 * 60);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(0);

  const currentPrompt = SPEAKING_PROMPTS[0];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive && timerSeconds < timerTarget) {
      interval = setInterval(() => setTimerSeconds((s) => s + 1), 1000);
    } else if (timerSeconds >= timerTarget && timerActive) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerSeconds, timerTarget]);

  const timerMin = Math.floor(timerSeconds / 60);
  const timerSec = timerSeconds % 60;
  const timerPct = Math.min((timerSeconds / timerTarget) * 100, 100);

  function resetTimer() {
    setTimerActive(false);
    setTimerSeconds(0);
    setCompleted(false);
    setSaved(false);
  }

  async function markComplete() {
    setCompleted(true);
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("assignment_completions").insert({
      user_id: user.id,
      assignment_type: "speaking",
      week_number: currentPrompt.week,
      phase: currentPrompt.phase,
      score: null,
    });
    setSaved(true);
    setSaving(false);
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Speaking Practice</h1>
        <p className="text-slate-500 mt-1">Build fluency and confidence — coached by Klaus Meyer</p>
      </div>

      {/* Klaus quote */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white">
        <p className="text-slate-300 text-sm mb-1">Klaus Meyer says:</p>
        <p className="font-semibold text-lg">&ldquo;Sprechen lernt man nur durch Sprechen.&rdquo;</p>
        <p className="text-slate-400 text-sm mt-1">You only learn to speak by speaking — even when it&apos;s imperfect.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["mirror", "topics", "exam"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium capitalize transition",
              activeTab === tab ? "bg-yellow-400 text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {tab === "mirror" ? "🪞 Mirror Method" : tab === "topics" ? "💬 Topic Cards" : "🎓 Exam Prep"}
          </button>
        ))}
      </div>

      {/* MIRROR METHOD */}
      {activeTab === "mirror" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-900 text-lg mb-2">The Mirror Method</h2>
            <p className="text-slate-500 text-sm mb-4">
              Find a quiet private space. Set the timer. Speak German out loud — no stopping, no English.
            </p>

            {/* Timer */}
            <div className="flex flex-col items-center py-8">
              <div
                className={cn(
                  "text-6xl font-mono font-black mb-4",
                  timerSeconds >= timerTarget ? "text-green-600" : "text-slate-900"
                )}
              >
                {String(timerMin).padStart(2, "0")}:{String(timerSec).padStart(2, "0")}
              </div>
              <div className="w-64 h-3 bg-slate-100 rounded-full mb-4">
                <div
                  className="h-3 bg-yellow-400 rounded-full transition-all duration-1000"
                  style={{ width: `${timerPct}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 mb-6">Target: {timerMin >= (timerTarget / 60) ? "Done! 🎉" : `${Math.floor(timerTarget/60)} minutes`}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setTimerActive((t) => !t)}
                  className={cn(
                    "px-6 py-3 rounded-xl font-semibold text-sm transition",
                    timerActive
                      ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      : "bg-yellow-400 text-slate-900 hover:bg-yellow-500"
                  )}
                >
                  {timerActive ? "⏸ Pause" : timerSeconds > 0 ? "▶ Resume" : "▶ Start"}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-4 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm hover:bg-slate-200 transition"
                >
                  Reset
                </button>
                <select
                  value={timerTarget}
                  onChange={(e) => { setTimerTarget(Number(e.target.value)); resetTimer(); }}
                  className="px-3 py-3 bg-slate-100 text-slate-600 rounded-xl text-sm outline-none"
                >
                  <option value={5 * 60}>5 min</option>
                  <option value={10 * 60}>10 min</option>
                  <option value={12 * 60}>12 min</option>
                  <option value={15 * 60}>15 min</option>
                </select>
              </div>
            </div>

            {!completed && timerSeconds > 60 && (
              <button
                onClick={markComplete}
                disabled={saving}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition mt-4"
              >
                {saving ? "Saving..." : "Mark as Complete ✓"}
              </button>
            )}
            {saved && (
              <div className="text-center py-3 text-green-700 font-medium text-sm">
                ✓ Session saved to progress tracker
              </div>
            )}
          </div>

          {/* Today's prompts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Today&apos;s Mirror Prompts (Week 1)</h3>
            <div className="space-y-3">
              {currentPrompt.prompts.map((prompt, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className="w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700">{prompt}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-xl">
              <p className="text-sm font-semibold text-amber-800 mb-2">Klaus&apos;s Rules</p>
              <ul className="space-y-1">
                {currentPrompt.tips.map((tip) => (
                  <li key={tip} className="text-sm text-amber-700 flex items-start gap-1.5">
                    <span className="mt-0.5 shrink-0">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Opinion phrases */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-3">Opinion Phrases to Use</h3>
            <div className="flex flex-wrap gap-2">
              {OPINION_PHRASES.map((phrase) => (
                <span key={phrase} className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm px-3 py-1.5 rounded-xl font-medium">
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOPIC CARDS */}
      {activeTab === "topics" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">
              Choose a topic card. Speak for 2 minutes on the bullet points. Then discuss with a Tandem partner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {TELC_TOPICS.map((t, i) => (
              <button
                key={t.topic}
                onClick={() => setSelectedTopic(i)}
                className={cn(
                  "text-left p-5 rounded-2xl border transition",
                  selectedTopic === i
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-slate-200 bg-white hover:border-yellow-200"
                )}
              >
                <p className="font-bold text-slate-900">{t.topic}</p>
                <ul className="mt-2 space-y-1">
                  {t.points.map((p) => (
                    <li key={p} className="text-sm text-slate-500 flex items-start gap-1.5">
                      <span className="mt-0.5 shrink-0 text-yellow-500">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-3">Planning Phrases (Part 5c)</h3>
            <div className="flex flex-wrap gap-2">
              {PLANNING_PHRASES.map((phrase) => (
                <span key={phrase} className="bg-blue-50 border border-blue-200 text-blue-800 text-sm px-3 py-1.5 rounded-xl font-medium">
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EXAM PREP */}
      {activeTab === "exam" && (
        <div className="space-y-4">
          {[
            {
              part: "Part 5a — Vorstellung",
              duration: "90 seconds",
              desc: "Introduce yourself: name, origin, time in Germany, job, family, hobbies, reason for learning German.",
              template:
                "Mein Name ist [Name]. Ich komme ursprünglich aus [Land]. Ich lebe seit [X Jahren] in Deutschland und wohne in [Stadt].\n\nVon Beruf bin ich [Beruf]. In meiner Freizeit [Hobby]. Ich lerne Deutsch, weil [Grund]. Mein Ziel ist es, die TELC B1-Prüfung zu bestehen.",
            },
            {
              part: "Part 5b — Topic Discussion",
              duration: "2–3 minutes",
              desc: "Receive a topic card. Speak on bullet points. Then discuss with your partner.",
              template:
                "Das Thema meiner Karte ist [Thema]. Ich finde dieses Thema sehr wichtig, weil…\n\nMeiner Meinung nach [Position]. Ich denke das, weil [Grund]. Zum Beispiel [Beispiel].\n\nAußerdem [Punkt 2]. Das zeigt, dass [Schlussfolgerung].\n\nWas meinen Sie dazu?",
            },
            {
              part: "Part 5c — Joint Planning",
              duration: "3–4 minutes",
              desc: "Plan something together — e.g., organise a workplace event. Negotiate and reach a decision.",
              template:
                "Ich schlage vor, dass wir [Idee]. Was meinen Sie?\n\n[Partner responds]\n\nDas klingt gut. Wie wäre es außerdem mit [Idee 2]?\n\nAlso, wir sind uns einig: [Decision]. Ich werde [Task] übernehmen.",
            },
          ].map((section) => (
            <div key={section.part} className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-bold text-slate-900">{section.part}</h3>
                <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-2.5 py-0.5 rounded-full">
                  {section.duration}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-3">{section.desc}</p>
              <pre className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed border border-slate-100">
                {section.template}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
