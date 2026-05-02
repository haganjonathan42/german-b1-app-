import Link from "next/link";

const EXERCISE_TYPES = [
  {
    href: "/exercises/grammar",
    icon: "✏️",
    title: "Grammar Exercises",
    description: "Interactive multiple-choice and fill-in-the-blank exercises from Week 1 to Week 28. Designed by Thomas Becker.",
    badge: "Weeks 1–28",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    href: "/writing",
    icon: "📝",
    title: "Writing Practice",
    description: "Email and essay prompts with a full text editor. Save your work, check word count, and self-grade against model answers.",
    badge: "All phases",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    href: "/speaking",
    icon: "🎤",
    title: "Speaking Prompts",
    description: "Mirror method tasks, topic monologues, and TELC exam simulations. Includes timer and self-evaluation rubric.",
    badge: "Daily practice",
    badgeColor: "bg-yellow-100 text-yellow-700",
  },
];

const LISTENING_RESOURCES = [
  {
    name: "Langsam Gesprochene Nachrichten",
    desc: "Today's slow German news with transcript",
    url: "https://learngerman.dw.com/en/slowly-spoken-news",
    tip: "Listen first, then check transcript",
  },
  {
    name: "Easy German (YouTube)",
    desc: "Street interviews with dual subtitles",
    url: "https://www.youtube.com/@EasyGerman",
    tip: "Watch 1 video, 2–3x per week",
  },
  {
    name: "logo! Nachrichten (ARD)",
    desc: "Children's news — clear and simple",
    url: "https://www.ardmediathek.de",
    tip: "5 minutes daily from Phase 2",
  },
];

export default function ExercisesPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Exercises</h1>
        <p className="text-slate-500 mt-1">Practice all four skills — grammar, writing, speaking, and listening</p>
      </div>

      {/* Active exercises */}
      <div className="grid gap-4">
        {EXERCISE_TYPES.map((ex) => (
          <Link
            key={ex.href}
            href={ex.href}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-yellow-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{ex.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-yellow-700 transition">
                    {ex.title}
                  </h3>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${ex.badgeColor}`}>
                    {ex.badge}
                  </span>
                </div>
                <p className="text-slate-500 text-sm">{ex.description}</p>
              </div>
              <span className="text-slate-300 group-hover:text-yellow-400 text-xl transition">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Listening section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl">🎧</span>
          <div>
            <h2 className="font-bold text-slate-900 text-lg">Listening Practice</h2>
            <p className="text-slate-500 text-sm">Daily listening from curated free resources</p>
          </div>
        </div>

        <div className="space-y-3">
          {LISTENING_RESOURCES.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-yellow-50 transition group"
            >
              <div className="flex-1">
                <p className="font-medium text-slate-800 group-hover:text-yellow-700 transition text-sm">
                  {r.name}
                </p>
                <p className="text-xs text-slate-400">{r.desc}</p>
                <p className="text-xs text-yellow-600 mt-1 font-medium">Tip: {r.tip}</p>
              </div>
              <span className="text-slate-300 group-hover:text-yellow-400 transition">↗</span>
            </a>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-800 font-medium">📋 Listening Method (Phase 1–2)</p>
          <ol className="mt-2 space-y-1 text-sm text-blue-700">
            <li>1. Scan the transcript first (3 min)</li>
            <li>2. Listen without transcript — note main topic</li>
            <li>3. Listen again with transcript open</li>
            <li>4. Add 5 new words to Anki</li>
          </ol>
        </div>
      </div>

      {/* Weekly assignment overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">Week 1 Assignment Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Grammar", week: 1, href: "/exercises/grammar", time: "15–20 min", icon: "✏️" },
            { label: "Writing", week: 1, href: "/writing", time: "20–25 min", icon: "📝" },
            { label: "Speaking", week: 1, href: "/speaking", time: "10–15 min", icon: "🎤" },
            { label: "Listening", week: 1, href: "/exercises", time: "20 min", icon: "🎧" },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="p-4 bg-slate-50 rounded-xl text-center hover:bg-yellow-50 transition group"
            >
              <span className="text-2xl">{a.icon}</span>
              <p className="font-semibold text-slate-800 text-sm mt-2 group-hover:text-yellow-700">
                {a.label}
              </p>
              <p className="text-xs text-slate-400">Week {a.week}</p>
              <p className="text-xs text-slate-400">{a.time}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
