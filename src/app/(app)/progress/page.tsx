import { createClient } from "@/lib/supabase/server";
import { CURRICULUM_PHASES, PHASE_COLORS } from "@/data/curriculum";

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const { data: completions } = await supabase
    .from("assignment_completions")
    .select("*")
    .eq("user_id", user!.id)
    .order("completed_at", { ascending: false });

  const { data: writingEntries } = await supabase
    .from("writing_entries")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  const allCompletions = completions ?? [];
  const allWriting = writingEntries ?? [];

  // Stats
  const grammarDone = allCompletions.filter((c) => c.assignment_type === "grammar");
  const writingDone = allCompletions.filter((c) => c.assignment_type === "writing");
  const speakingDone = allCompletions.filter((c) => c.assignment_type === "speaking");
  const listeningDone = allCompletions.filter((c) => c.assignment_type === "listening");

  const avgGrammar =
    grammarDone.length > 0
      ? Math.round(grammarDone.filter((c) => c.score !== null).reduce((sum, c) => sum + (c.score ?? 0), 0) / grammarDone.filter((c) => c.score !== null).length)
      : null;

  const avgWriting =
    allWriting.filter((w) => w.self_score !== null).length > 0
      ? Math.round(allWriting.filter((w) => w.self_score !== null).reduce((sum, w) => sum + (w.self_score ?? 0), 0) / allWriting.filter((w) => w.self_score !== null).length)
      : null;

  const currentPhase = profile?.current_phase ?? 1;
  const streak = profile?.study_streak ?? 0;
  const phaseData = CURRICULUM_PHASES.find((p) => p.id === currentPhase)!;
  const phaseColors = PHASE_COLORS[currentPhase];

  // Exam readiness
  const readinessItems = [
    { label: "Grammar: average score ≥ 70%", done: avgGrammar !== null && avgGrammar >= 70 },
    { label: "Writing: at least 3 texts submitted", done: allWriting.length >= 3 },
    { label: "Speaking: at least 5 sessions completed", done: speakingDone.length >= 5 },
    { label: "Phase 1 exercises completed", done: grammarDone.length >= 5 },
  ];
  const readinessScore = Math.round((readinessItems.filter((r) => r.done).length / readinessItems.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Progress Tracker</h1>
        <p className="text-slate-500 mt-1">Your honest record of how far you&apos;ve come</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Grammar Exercises", count: grammarDone.length, icon: "✏️", avg: avgGrammar },
          { label: "Writing Pieces", count: allWriting.length, icon: "📝", avg: avgWriting },
          { label: "Speaking Sessions", count: speakingDone.length, icon: "🎤", avg: null },
          { label: "Study Streak", count: streak, icon: "🔥", avg: null, suffix: "days" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5">
            <span className="text-2xl">{s.icon}</span>
            <p className="text-3xl font-black text-slate-900 mt-2">
              {s.count}{s.suffix && <span className="text-base font-semibold text-slate-400 ml-1">{s.suffix}</span>}
            </p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-1">{s.label}</p>
            {s.avg !== null && s.avg !== undefined && (
              <p className="text-sm font-semibold text-yellow-600 mt-1">Avg: {s.avg}%</p>
            )}
          </div>
        ))}
      </div>

      {/* Skill breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-5">Skill Breakdown</h2>
        <div className="space-y-4">
          {[
            {
              skill: "Grammar",
              done: grammarDone.length,
              target: 28,
              avg: avgGrammar,
              color: "bg-blue-500",
              icon: "✏️",
            },
            {
              skill: "Writing",
              done: allWriting.length,
              target: 20,
              avg: avgWriting,
              color: "bg-green-500",
              icon: "📝",
            },
            {
              skill: "Speaking",
              done: speakingDone.length,
              target: 48,
              avg: null,
              color: "bg-yellow-500",
              icon: "🎤",
            },
            {
              skill: "Listening",
              done: listeningDone.length,
              target: 48,
              avg: null,
              color: "bg-purple-500",
              icon: "🎧",
            },
          ].map((s) => {
            const pct = Math.min(Math.round((s.done / s.target) * 100), 100);
            return (
              <div key={s.skill}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{s.skill}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {s.avg !== null && s.avg !== undefined && (
                      <span className="text-sm font-semibold text-yellow-600">Avg: {s.avg}%</span>
                    )}
                    <span className="text-sm text-slate-500">
                      {s.done} / {s.target}
                    </span>
                    <span className="text-sm font-semibold text-slate-700 w-10 text-right">{pct}%</span>
                  </div>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full">
                  <div
                    className={`h-2.5 ${s.color} rounded-full transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current phase */}
      <div className={`rounded-2xl border p-6 ${phaseColors.bg} ${phaseColors.border}`}>
        <div className="flex items-start justify-between">
          <div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${phaseColors.badge}`}>
              {phaseData.months}
            </span>
            <h2 className={`font-bold text-xl mt-2 ${phaseColors.text}`}>
              {phaseData.title}: {phaseData.subtitle}
            </h2>
            <p className="text-slate-600 text-sm mt-1">{phaseData.goal}</p>
          </div>
        </div>
      </div>

      {/* Exam readiness */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-2">Exam Readiness</h2>
        <p className="text-slate-500 text-sm mb-5">
          Track your readiness for the TELC B1 exam. These milestones update as you complete work.
        </p>
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-semibold text-slate-700">Overall readiness</span>
            <span className="font-bold text-slate-900">{readinessScore}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full">
            <div
              className={`h-3 rounded-full transition-all ${
                readinessScore >= 80
                  ? "bg-green-500"
                  : readinessScore >= 50
                  ? "bg-yellow-400"
                  : "bg-slate-300"
              }`}
              style={{ width: `${readinessScore}%` }}
            />
          </div>
        </div>
        <div className="space-y-2">
          {readinessItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 p-3 rounded-xl text-sm ${
                item.done ? "bg-green-50 text-green-800" : "bg-slate-50 text-slate-600"
              }`}
            >
              <span className={item.done ? "text-green-500" : "text-slate-300"}>
                {item.done ? "✓" : "○"}
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Recent completions */}
      {allCompletions.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {allCompletions.slice(0, 10).map((c) => (
              <div
                key={c.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl text-sm"
              >
                <span>
                  {c.assignment_type === "grammar"
                    ? "✏️"
                    : c.assignment_type === "writing"
                    ? "📝"
                    : c.assignment_type === "speaking"
                    ? "🎤"
                    : "🎧"}
                </span>
                <div className="flex-1">
                  <span className="font-medium text-slate-700 capitalize">
                    {c.assignment_type}
                  </span>
                  <span className="text-slate-400 mx-1">—</span>
                  <span className="text-slate-500">Week {c.week_number}</span>
                </div>
                {c.score !== null && (
                  <span
                    className={`font-semibold ${
                      c.score >= 80
                        ? "text-green-600"
                        : c.score >= 70
                        ? "text-blue-600"
                        : c.score >= 60
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {c.score}%
                  </span>
                )}
                <span className="text-slate-400 text-xs">
                  {new Date(c.completed_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {allCompletions.length === 0 && allWriting.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p className="text-5xl mb-4">📊</p>
          <p className="font-medium">No activity recorded yet.</p>
          <p className="text-sm mt-1">Complete exercises to see your progress here.</p>
        </div>
      )}
    </div>
  );
}
