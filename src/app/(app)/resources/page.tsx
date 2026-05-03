import { RESOURCES, RESOURCE_TYPE_LABELS, RESOURCE_TYPE_COLORS } from "@/data/resources";

export default function ResourcesPage() {
  const byType = RESOURCES.reduce<Record<string, typeof RESOURCES>>((acc, r) => {
    if (!acc[r.type]) acc[r.type] = [];
    acc[r.type].push(r);
    return acc;
  }, {});

  const typeOrder = ["course", "listening", "vocabulary", "grammar", "speaking", "writing", "exam"];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Free Resources</h1>
        <p className="text-slate-500 mt-1">Curated by Daniel Weber — everything here is 100% free</p>
      </div>

      {/* Summary card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-bold">Daniel Weber — Free Resources Specialist</p>
            <p className="text-slate-400 text-sm">11 years curating zero-budget German learning tools</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm">
          The best learning resource is the one you actually use. Start with the ★★★★★ tools.
          Use the ★★★★☆ tools as supplements once the core stack is established.
        </p>
        <div className="mt-4 grid grid-cols-4 gap-3 text-center">
          {[
            { label: "Resources", value: String(RESOURCES.length) },
            { label: "All Free", value: "✓" },
            { label: "Types", value: String(typeOrder.length) },
            { label: "Monthly cost", value: "€0" },
          ].map((s) => (
            <div key={s.label} className="bg-slate-800 rounded-xl p-3">
              <p className="text-yellow-400 font-bold text-lg">{s.value}</p>
              <p className="text-slate-400 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily stack recommendation */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h2 className="font-bold text-slate-900 mb-4">Recommended Daily Stack (1 hour)</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { slot: "A — 20 min", tool: "Schubert Verlag or DW Nicos Weg", desc: "Grammar exercises" },
            { slot: "B — 20 min", tool: "Anki", desc: "New cards + daily review" },
            { slot: "C — 20 min", tool: "Langsam Gesprochene Nachrichten", desc: "Slow news + transcript" },
          ].map((s) => (
            <div key={s.slot} className="bg-white rounded-xl p-4 border border-yellow-100">
              <p className="text-xs font-bold text-yellow-700 uppercase tracking-wide">{s.slot}</p>
              <p className="font-semibold text-slate-900 text-sm mt-1">{s.tool}</p>
              <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources by type */}
      {typeOrder.map((type) => {
        const items = byType[type];
        if (!items) return null;
        const colorClass = RESOURCE_TYPE_COLORS[type] ?? "bg-slate-100 text-slate-600";

        return (
          <div key={type}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${colorClass}`}>
                {RESOURCE_TYPE_LABELS[type]}
              </span>
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">{items.length} resources</span>
            </div>

            <div className="space-y-3">
              {items.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 bg-white rounded-2xl border border-slate-200 p-5 hover:border-yellow-300 hover:shadow-sm transition group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-yellow-700 transition">
                        {resource.name}
                      </h3>
                      <span className="text-yellow-400 text-xs">
                        {"★".repeat(resource.stars)}{"☆".repeat(5 - resource.stars)}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm">{resource.description}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {resource.levels.map((l) => (
                        <span
                          key={l}
                          className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase"
                        >
                          {l}
                        </span>
                      ))}
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        FREE
                      </span>
                    </div>
                  </div>
                  <span className="text-slate-300 group-hover:text-yellow-400 transition text-xl mt-1">↗</span>
                </a>
              ))}
            </div>
          </div>
        );
      })}

      {/* Immersion section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-4">Daily Immersion — You Live in Germany</h2>
        <div className="space-y-3">
          {[
            { action: "Switch phone to German", how: "Settings → Sprache → Deutsch", impact: "Constant daily exposure" },
            { action: "Read tagesschau.de headlines", how: "5 minutes every morning", impact: "News vocabulary" },
            { action: "Speak German in shops/services", how: "Every single interaction", impact: "Real communication practice" },
            { action: "Watch logo! Nachrichten", how: "5 min every evening", impact: "Clear spoken German" },
            { action: "Listen to German radio", how: "Deutschlandfunk during commute", impact: "Natural listening speed" },
          ].map((item) => (
            <div key={item.action} className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
              <div className="flex-1">
                <p className="font-medium text-slate-800 text-sm">{item.action}</p>
                <p className="text-xs text-slate-400">{item.how}</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg font-medium shrink-0">
                {item.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
