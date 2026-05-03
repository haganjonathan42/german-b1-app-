import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { CURRICULUM_BY_LEVEL, DAILY_SCHEDULE, LEVEL_COLORS, LEVEL_LABELS } from "@/data/curriculum";
import type { Level } from "@/types";

export default async function DashboardPage() {
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
    .order("completed_at", { ascending: false })
    .limit(5);

  const { data: writingEntries } = await supabase
    .from("writing_entries")
    .select("id")
    .eq("user_id", user!.id);

  const currentLevel: Level = (profile?.current_level as Level) ?? "a1";
  const streak = profile?.study_streak ?? 0;
  const levelData = CURRICULUM_BY_LEVEL[currentLevel];
  const firstPhase = levelData.phases[0];
  const totalAssignments = completions?.length ?? 0;
  const totalWriting = writingEntries?.length ?? 0;
  const firstName = (profile?.full_name ?? user?.email ?? "Learner").split(" ")[0];

  const today = new Date();
  const hour = today.getHours();
  const greeting = hour < 12 ? "Guten Morgen" : hour < 17 ? "Guten Tag" : "Guten Abend";

  const levelColors = LEVEL_COLORS[currentLevel];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {greeting}, {firstName}! 👋
          </h1>
          <p className="text-slate-500 mt-1">Ready for today&apos;s German practice?</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${levelColors.bg} ${levelColors.border} ${levelColors.text}`}>
          <div className={`w-2 h-2 rounded-full ${levelColors.dot}`} />
          {LEVEL_LABELS[currentLevel]}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="🔥"
          label="Study Streak"
          value={`${streak} day${streak !== 1 ? "s" : ""}`}
          sub="Keep it going!"
          color="orange"
        />
        <StatCard
          icon="📍"
          label="Current Level"
          value={LEVEL_LABELS[currentLevel].split(" — ")[0]}
          sub={levelData.title}
          color="blue"
        />
        <StatCard
          icon="✅"
          label="Exercises Done"
          value={String(totalAssignments)}
          sub="Total completed"
          color="green"
        />
        <StatCard
          icon="✍️"
          label="Texts Written"
          value={String(totalWriting)}
          sub="Saved entries"
          color="purple"
        />
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left — Today's plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's schedule */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="font-bold text-slate-900 text-lg mb-4">Today&apos;s Study Plan</h2>
            <p className="text-sm text-slate-500 mb-4">
              Your daily 1-hour block — split into 3 focused sessions:
            </p>
            <div className="space-y-3">
              {DAILY_SCHEDULE.map((slot) => (
                <div
                  key={slot.slot}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-sm font-bold text-yellow-700 shrink-0">
                    {slot.slot}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{slot.activity}</p>
                    <p className="text-xs text-slate-400">{slot.time}</p>
                  </div>
                  <span className="text-xl">{slot.icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current level first phase */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors.badge}`}>
                  {levelData.duration}
                </span>
                <h2 className="font-bold text-slate-900 text-lg mt-2">
                  {firstPhase.title}: {firstPhase.subtitle}
                </h2>
                <p className="text-slate-500 text-sm mt-1">{firstPhase.goal}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Grammar Focus
                </p>
                <ul className="space-y-1">
                  {firstPhase.grammarTopics.slice(0, 3).map((topic) => (
                    <li key={topic} className="flex items-start gap-1.5 text-sm text-slate-600">
                      <span className="text-yellow-500 mt-0.5 shrink-0">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Vocabulary Themes
                </p>
                <ul className="space-y-1">
                  {firstPhase.vocabThemes.slice(0, 3).map((theme) => (
                    <li key={theme} className="flex items-start gap-1.5 text-sm text-slate-600">
                      <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                      {theme}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link
              href="/curriculum"
              className="mt-4 inline-flex items-center text-sm text-yellow-600 font-medium hover:text-yellow-700"
            >
              View full curriculum →
            </Link>
          </div>
        </div>

        {/* Right — Quick actions + recent */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Quick Start</h3>
            <div className="space-y-2">
              <QuickLink href="/exercises/grammar" icon="✏️" label="Grammar Exercise" sub={`${LEVEL_LABELS[currentLevel]} exercises`} />
              <QuickLink href="/writing" icon="📝" label="Writing Practice" sub="Write an email or essay" />
              <QuickLink href="/speaking" icon="🎤" label="Speaking Prompt" sub="Mirror method + topics" />
              <QuickLink href="/resources" icon="🔗" label="Browse Resources" sub="Free tools & websites" />
            </div>
          </div>

          {/* Recent completions */}
          {completions && completions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {completions.slice(0, 4).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 text-sm">
                    <span className="text-base">
                      {c.assignment_type === "grammar"
                        ? "✏️"
                        : c.assignment_type === "writing"
                        ? "📝"
                        : c.assignment_type === "speaking"
                        ? "🎤"
                        : "🎧"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-700 capitalize truncate">
                        {c.assignment_type} — Week {c.week_number}
                      </p>
                      {c.score !== null && (
                        <p className="text-xs text-slate-400">Score: {c.score}%</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Motivational card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
            <p className="text-sm text-slate-300 mb-2">Daily reminder</p>
            <p className="font-medium text-sm leading-relaxed">
              &ldquo;Sprechen lernt man nur durch Sprechen.&rdquo;
            </p>
            <p className="text-xs text-yellow-400 mt-1">— Klaus Meyer</p>
            <p className="text-xs text-slate-400 mt-3">
              Target: TELC B1 · May 2027
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon, label, value, sub, color,
}: {
  icon: string; label: string; value: string; sub: string;
  color: "orange" | "blue" | "green" | "purple";
}) {
  const colors = {
    orange: "bg-orange-50 border-orange-100",
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-100",
  };
  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-0.5">{label}</p>
      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
    </div>
  );
}

function QuickLink({ href, icon, label, sub }: { href: string; icon: string; label: string; sub: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-sm font-medium text-slate-700 group-hover:text-yellow-700">{label}</p>
        <p className="text-xs text-slate-400">{sub}</p>
      </div>
    </Link>
  );
}
