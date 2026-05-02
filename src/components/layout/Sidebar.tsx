"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/curriculum", label: "Curriculum", icon: "📚" },
  { href: "/exercises", label: "Exercises", icon: "✏️" },
  { href: "/writing", label: "Writing", icon: "📝" },
  { href: "/speaking", label: "Speaking", icon: "🎤" },
  { href: "/resources", label: "Resources", icon: "🔗" },
  { href: "/progress", label: "Progress", icon: "📊" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <span className="text-2xl">🇩🇪</span>
          <div>
            <p className="font-bold text-white text-sm leading-tight">Deutsch B1</p>
            <p className="text-slate-400 text-xs">Learning Hub</p>
          </div>
        </Link>
        {/* German flag stripe */}
        <div className="flex gap-0.5 mt-3">
          <div className="h-0.5 flex-1 bg-slate-900 border border-slate-600" />
          <div className="h-0.5 flex-1 bg-red-600" />
          <div className="h-0.5 flex-1 bg-yellow-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-yellow-400 text-slate-900"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Target info */}
      <div className="p-4 mx-4 mb-4 bg-slate-800 rounded-xl">
        <p className="text-xs text-slate-400 mb-1">Target Exam</p>
        <p className="text-white text-sm font-semibold">TELC B1</p>
        <p className="text-yellow-400 text-xs">May 2027</p>
        <div className="mt-2 h-1.5 bg-slate-700 rounded-full">
          <div className="h-1.5 bg-yellow-400 rounded-full" style={{ width: "8%" }} />
        </div>
        <p className="text-slate-500 text-xs mt-1">Month 1 of 12</p>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <span>🚪</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
