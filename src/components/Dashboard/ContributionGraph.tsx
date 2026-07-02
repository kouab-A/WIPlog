"use client";

import { useMemo, useState } from "react";
import { getContributionData, getStreak } from "@/lib/demoData";
import { Flame } from "lucide-react";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

function cellColor(count: number, accent: string): string {
  if (count === 0) return "var(--bg-elevated)";
  if (count === 1) return `${accent}55`;
  return accent;
}

export default function ContributionGraph({ accent = "#7c6af8" }: { accent?: string }) {
  const contributions = useMemo(() => getContributionData(), []);
  const streak        = useMemo(() => getStreak(), []);
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  // Build 52-week grid: 7 rows × 52 cols
  // Align so that the last column ends today
  const today   = new Date();
  const todayDOW = today.getDay(); // 0=Sun

  // contributions is 364 days (today is the last element)
  // We need to pad the beginning to align to Sunday
  const padStart = (7 - ((364 - todayDOW - 1) % 7)) % 7;
  const cells    = [...Array(padStart).fill(null), ...contributions];
  // Group into weeks of 7
  const weeks: (typeof contributions[0] | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7) as (typeof contributions[0] | null)[]);
  }

  // Month labels: find which week each month starts in
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstReal = week.find((c) => c !== null);
    if (firstReal) {
      const m = new Date(firstReal.date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ label: `${m + 1}月`, col: wi });
        lastMonth = m;
      }
    }
  });

  const CELL = 11;
  const GAP  = 2;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          記録の軌跡
        </span>
        {streak > 0 && (
          <div
            className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: `${accent}20`, color: accent }}
          >
            <Flame size={12} />
            {streak}日連続記録中
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-1">
        {/* Month labels */}
        <div className="flex mb-1" style={{ gap: `${GAP}px`, paddingLeft: "20px" }}>
          {weeks.map((_, wi) => {
            const label = monthLabels.find((m) => m.col === wi);
            return (
              <div
                key={wi}
                className="text-[10px] shrink-0"
                style={{ width: `${CELL}px`, color: label ? "var(--text-muted)" : "transparent" }}
              >
                {label?.label ?? "."}
              </div>
            );
          })}
        </div>

        {/* Day rows */}
        <div className="flex gap-1">
          {/* Day of week labels */}
          <div className="flex flex-col shrink-0" style={{ gap: `${GAP}px` }}>
            {["日", "月", "火", "水", "木", "金", "土"].map((d, i) => (
              <div
                key={d}
                className="text-[10px] flex items-center justify-end pr-1"
                style={{ height: `${CELL}px`, color: i % 2 === 1 ? "var(--text-muted)" : "transparent" }}
              >
                {i % 2 === 1 ? d : "·"}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="flex" style={{ gap: `${GAP}px` }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: `${GAP}px` }}>
                {week.map((cell, di) => (
                  <div
                    key={di}
                    className="rounded-sm cursor-pointer transition-transform hover:scale-125"
                    style={{
                      width:  `${CELL}px`,
                      height: `${CELL}px`,
                      background: cell ? cellColor(cell.count, accent) : "var(--bg-elevated)",
                      border: cell && cell.count > 0 ? `1px solid ${accent}33` : "1px solid var(--border-subtle)",
                    }}
                    onMouseEnter={(e) => {
                      if (cell) setTooltip({ ...cell, x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-2 justify-end">
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>少ない</span>
          {[0, 1, 2].map((level) => (
            <div
              key={level}
              className="rounded-sm"
              style={{
                width: `${CELL}px`,
                height: `${CELL}px`,
                background: cellColor(level, accent),
                border: `1px solid ${accent}33`,
              }}
            />
          ))}
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>多い</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[500] pointer-events-none px-2.5 py-1.5 rounded-lg text-xs shadow-lg"
          style={{
            left:       tooltip.x + 12,
            top:        tooltip.y - 36,
            background: "var(--bg-card)",
            border:     "1px solid var(--border)",
            color:      "var(--text-primary)",
            whiteSpace: "nowrap",
          }}
        >
          {formatDate(tooltip.date)} ·{" "}
          {tooltip.count > 0 ? `${tooltip.count}件の記録` : "記録なし"}
        </div>
      )}
    </div>
  );
}
