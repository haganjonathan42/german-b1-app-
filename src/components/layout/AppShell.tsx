"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Default to closed on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}
      >
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <span className="text-xl">🇩🇪</span>
          <span className="text-white font-bold text-sm">Deutsch B1</span>
        </div>

        {/* Desktop toggle button — shown when sidebar is closed */}
        {!sidebarOpen && (
          <div className="hidden lg:block sticky top-0 z-20 bg-slate-50 border-b border-slate-200 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-slate-200 transition"
            >
              <Menu size={16} />
              Show menu
            </button>
          </div>
        )}

        <main className="flex-1 bg-slate-50">
          <div className="max-w-5xl mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
