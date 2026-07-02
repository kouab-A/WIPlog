"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { DEMO_PROJECTS, DEMO_HISTORIES, getLineChartData } from "@/lib/demoData";

function formatXAxis(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { dataKey: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length || !label) return null;

  return (
    <div
      className="rounded-xl px-3 py-2.5 text-xs shadow-xl pointer-events-none"
      style={{
        background: "var(--bg-card)",
        border:     "1px solid var(--border)",
        maxWidth:   "240px",
        minWidth:   "160px",
      }}
    >
      <p className="font-semibold mb-2 pb-1.5" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border-subtle)" }}>
        {formatXAxis(label)}
      </p>
      {payload.map((entry) => {
        const project = DEMO_PROJECTS.find((p) => p.id === entry.dataKey);
        if (!project) return null;
        const historyEntry = DEMO_HISTORIES[project.id].find((h) => h.date === label);
        return (
          <div key={entry.dataKey} className="mb-2 last:mb-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: project.color }} />
              <span className="font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                {project.title}
              </span>
              <span className="ml-auto font-mono font-bold shrink-0" style={{ color: project.color }}>
                {entry.value}%
              </span>
            </div>
            {historyEntry && (
              <p className="text-[11px] pl-3.5 leading-snug line-clamp-2" style={{ color: "var(--text-muted)" }}>
                {historyEntry.content}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CustomDot(props: { cx?: number; cy?: number; payload?: Record<string, unknown>; dataKey?: string; stroke?: string }) {
  const { cx, cy, payload, dataKey, stroke } = props;
  if (!cx || !cy || !payload || !dataKey) return null;
  // Only render a dot if this project has an exact entry on this date
  const date    = payload.date as string;
  const project = DEMO_PROJECTS.find((p) => p.id === dataKey);
  if (!project) return null;
  const hasEntry = DEMO_HISTORIES[project.id].some((h) => h.date === date);
  if (!hasEntry) return null;

  return (
    <circle
      cx={cx} cy={cy} r={4}
      fill={stroke}
      stroke="var(--bg-base)"
      strokeWidth={2}
    />
  );
}

export default function OverviewView() {
  const data = useMemo(() => getLineChartData(), []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          プロジェクト進捗の推移
        </span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {DEMO_PROJECTS.length} プロジェクト
        </span>
      </div>

      {/* Chart */}
      <div
        className="rounded-xl p-4"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
      >
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-subtle)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 10, fill: "var(--text-muted)" }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fontSize: 10, fill: "var(--text-muted)" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "4 4" }} />
            {DEMO_PROJECTS.map((project) => (
              <Line
                key={project.id}
                type="monotone"
                dataKey={project.id}
                stroke={project.color}
                strokeWidth={2}
                dot={(props) => <CustomDot {...props} dataKey={project.id} />}
                activeDot={{ r: 5, fill: project.color, stroke: "var(--bg-base)", strokeWidth: 2 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {DEMO_PROJECTS.map((p) => (
          <div key={p.id} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded" style={{ background: p.color, display: "inline-block" }} />
              <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="w-3 h-0.5 rounded" style={{ background: p.color, display: "inline-block" }} />
            </div>
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{p.title}</span>
            <span className="text-xs font-mono font-bold" style={{ color: p.color }}>{p.currentProgress}%</span>
          </div>
        ))}
      </div>

      {/* Project summary cards */}
      <div className="grid grid-cols-1 gap-2 mt-1">
        {DEMO_PROJECTS.map((p) => {
          const latest = DEMO_HISTORIES[p.id][DEMO_HISTORIES[p.id].length - 1];
          return (
            <div
              key={p.id}
              className="rounded-xl px-4 py-3 flex items-center gap-4"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
            >
              <div
                className="w-1 self-stretch rounded-full shrink-0"
                style={{ background: p.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{p.title}</span>
                  <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>{p.category}</span>
                </div>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{latest.content}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-lg font-mono font-black tabular-nums" style={{ color: p.color }}>{p.currentProgress}%</div>
                <div className="text-[10px]" style={{ color: p.color }}>+{latest.delta}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
