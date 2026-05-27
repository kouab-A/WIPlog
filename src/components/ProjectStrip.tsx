"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import ProgressBar from "./ProgressBar";
import { projects } from "@/lib/data";

export default function ProjectStrip() {
  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {projects.map((p) => (
        <Link
          key={p.id}
          href={`/projects/${p.id}`}
          className="shrink-0 rounded-lg px-3 py-2.5 min-w-[160px] transition-all hover:scale-[1.02]"
          style={
            isDark
              ? {
                  background: p.coverColor,
                  border: "1px solid var(--border-subtle)",
                }
              : {
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderLeft: `3px solid ${p.coverColor}`,
                }
          }
        >
          <p
            className="text-xs font-medium mb-2 line-clamp-1"
            style={{ color: isDark ? "#ffffff" : "var(--text-primary)" }}
          >
            {p.title}
          </p>
          <ProgressBar progress={p.currentProgress} size="sm" showLabel={true} />
        </Link>
      ))}
    </div>
  );
}
