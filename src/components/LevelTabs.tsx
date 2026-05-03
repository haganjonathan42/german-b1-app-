"use client";

import { LEVEL_COLORS } from "@/data/curriculum";
import { getAccessibleLevels, UNLOCK_REQUIREMENT } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Level } from "@/types";

const ALL_LEVELS: Level[] = ["a1", "a2", "b1"];

interface LevelTabsProps {
  userLevel: Level;
  selectedLevel: Level;
  onSelect: (level: Level) => void;
  countByLevel?: Partial<Record<Level, number>>;
  countLabel?: string;
}

export function LevelTabs({
  userLevel,
  selectedLevel,
  onSelect,
  countByLevel,
  countLabel = "items",
}: LevelTabsProps) {
  const accessible = getAccessibleLevels(userLevel);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-2 flex gap-2">
      {ALL_LEVELS.map((level) => {
        const isAccessible = accessible.includes(level);
        const isSelected = selectedLevel === level;
        const lc = LEVEL_COLORS[level];
        const isRevision = isAccessible && level !== userLevel;
        const count = countByLevel?.[level];

        if (!isAccessible) {
          return (
            <div
              key={level}
              title={UNLOCK_REQUIREMENT[level]}
              className="flex-1 py-2.5 px-3 rounded-xl text-sm text-slate-300 bg-slate-50 border border-slate-100 select-none"
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-slate-300">🔒</span>
                <span className="font-semibold">{level.toUpperCase()}</span>
              </div>
              <span className="block text-xs font-normal text-slate-300 text-center mt-0.5 leading-tight">
                {UNLOCK_REQUIREMENT[level].replace("Complete ", "").replace(" to unlock", "")}
              </span>
            </div>
          );
        }

        return (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className={cn(
              "flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition relative",
              isSelected
                ? `${lc.bg} ${lc.text} ${lc.border} border`
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            {level.toUpperCase()}
            {isRevision && (
              <span className="block text-xs font-normal opacity-60">Revision</span>
            )}
            {!isRevision && count !== undefined && (
              <span className="block text-xs font-normal opacity-70">{count} {countLabel}</span>
            )}
            {!isRevision && count === undefined && (
              <span className="block text-xs font-normal opacity-60">Your level</span>
            )}
            {level === userLevel && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
