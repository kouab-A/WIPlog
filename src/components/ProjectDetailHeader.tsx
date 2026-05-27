"use client";

import { useTheme } from "./ThemeProvider";
import ProgressBar from "./ProgressBar";
import { Calendar, Tag, TrendingUp } from "lucide-react";
import type { Project, User } from "@/lib/data";

type Props = {
  project:        Project;
  user:           User;
  postsCount:     number;
  firstProgress:  number;
  formattedStart: string;
};

export default function ProjectDetailHeader({
  project,
  user,
  postsCount,
  firstProgress,
  formattedStart,
}: Props) {
  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  return (
    <div
      className="rounded-xl p-6 mb-8"
      style={
        isDark
          ? {
              background: project.coverColor,
              border: "1px solid var(--border-subtle)",
            }
          : {
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderTop: `4px solid ${project.coverColor}`,
            }
      }
    >
      {/* User */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0"
          style={{ background: user.avatarColor }}
        >
          {user.name[0]}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
            {user.name}
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            @{user.handle}
          </p>
        </div>
      </div>

      {/* Title & description */}
      <h1 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
        {project.title}
      </h1>
      <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {project.description}
      </p>

      {/* Overall progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            総合進捗
          </span>
          <span className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
            {firstProgress}% → 現在
          </span>
        </div>
        <ProgressBar progress={project.currentProgress} size="lg" />
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} style={{ color: "var(--text-muted)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {formattedStart} 開始
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Tag size={12} style={{ color: "var(--text-muted)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp size={12} style={{ color: "var(--text-muted)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {postsCount}件の進捗記録
          </span>
        </div>
      </div>
    </div>
  );
}
