"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, ChevronRight, Plus, X, Send, CheckCircle2 } from "lucide-react";
import { useData } from "@/lib/store";
import ProgressBar from "./ProgressBar";

export default function LeftSidebar() {
  const pathname = usePathname();
  const activeId = pathname.startsWith("/projects/") ? pathname.split("/")[2] : null;
  const { projects, addPost } = useData();

  const [expandedId,   setExpandedId]   = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(50);
  const [formContent,  setFormContent]  = useState("");
  const [doneId,       setDoneId]       = useState<string | null>(null);

  const openForm = (projectId: string, currentProgress: number) => {
    if (expandedId === projectId) {
      setExpandedId(null);
    } else {
      setExpandedId(projectId);
      setFormProgress(Math.min(99, currentProgress + 5));
      setFormContent("");
    }
  };

  const handleSubmit = (projectId: string) => {
    if (!formContent.trim()) return;
    addPost({ projectId, progress: formProgress, content: formContent });
    setDoneId(projectId);
    setExpandedId(null);
    setFormContent("");
    setTimeout(() => setDoneId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          マイプロジェクト
        </span>
        <button
          className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors"
          style={{
            color: "var(--accent)",
            background: "var(--accent-glow)",
          }}
        >
          <Plus size={11} />
          <span>新規</span>
        </button>
      </div>

      {projects.map((p) => {
        const isActive   = p.id === activeId;
        const isExpanded = p.id === expandedId;
        const isDone     = p.id === doneId;

        return (
          <div key={p.id}>
            <div
              className="rounded-xl p-3 transition-all"
              style={{
                background: isActive ? "var(--accent-glow)" : "var(--bg-card)",
                border: `1px solid ${isActive ? "var(--accent-dim)" : "var(--border-subtle)"}`,
              }}
            >
              {/* Project title + link */}
              <div className="flex items-start justify-between gap-1 mb-2">
                <Link
                  href={`/projects/${p.id}`}
                  className="flex items-center gap-1.5 flex-1 min-w-0 group"
                >
                  <FolderOpen
                    size={13}
                    style={{ color: isActive ? "var(--accent)" : "var(--text-muted)" }}
                    className="shrink-0"
                  />
                  <span
                    className="text-xs font-medium line-clamp-1 group-hover:underline"
                    style={{ color: isActive ? "var(--accent)" : "var(--text-primary)" }}
                  >
                    {p.title}
                  </span>
                  <ChevronRight
                    size={11}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--text-muted)" }}
                  />
                </Link>
              </div>

              {/* Category */}
              <span
                className="text-xs px-1.5 py-0.5 rounded mb-2 inline-block"
                style={{
                  background: "var(--bg-elevated)",
                  color: "var(--text-muted)",
                }}
              >
                {p.category}
              </span>

              {/* Progress */}
              <div className="mt-2">
                <ProgressBar progress={p.currentProgress} size="sm" showLabel={true} />
              </div>

              {/* Actions */}
              <div className="mt-3 flex items-center gap-2">
                {isDone ? (
                  <span
                    className="flex items-center gap-1 text-xs"
                    style={{ color: "var(--accent)" }}
                  >
                    <CheckCircle2 size={12} />
                    記録しました！
                  </span>
                ) : (
                  <button
                    onClick={() => openForm(p.id, p.currentProgress)}
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-colors ml-auto"
                    style={{
                      background: isExpanded ? "var(--accent)" : "var(--accent-glow)",
                      color: isExpanded ? "white" : "var(--accent)",
                      border: `1px solid ${isExpanded ? "transparent" : "var(--accent-dim)"}`,
                    }}
                  >
                    {isExpanded ? <X size={11} /> : <Plus size={11} />}
                    <span>{isExpanded ? "閉じる" : "進捗を追加"}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick-add form */}
            {isExpanded && (
              <div
                className="rounded-xl p-3 mt-1"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* Progress slider */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      今の進捗度
                    </span>
                    <span
                      className="text-sm font-mono font-bold"
                      style={{ color: "var(--accent)" }}
                    >
                      {formProgress}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={99}
                    value={formProgress}
                    onChange={(e) => setFormProgress(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={
                      {
                        background: `linear-gradient(90deg, var(--accent) ${formProgress}%, var(--border) ${formProgress}%)`,
                        "--thumb-color": "var(--accent)",
                      } as React.CSSProperties
                    }
                  />
                </div>

                {/* Content input */}
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="今日できたことを一言…"
                  rows={2}
                  className="w-full rounded-lg px-2.5 py-2 text-xs resize-none outline-none"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
                />

                {/* Submit */}
                <button
                  onClick={() => handleSubmit(p.id)}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: formContent.trim() ? "var(--accent)" : "var(--bg-card)",
                    color: formContent.trim() ? "white" : "var(--text-muted)",
                    cursor: formContent.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  <Send size={11} />
                  <span>記録する</span>
                </button>

                <style>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 14px; height: 14px;
                    border-radius: 50%;
                    background: var(--thumb-color, var(--accent));
                    cursor: pointer;
                    box-shadow: 0 0 0 2px var(--accent-glow);
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 14px; height: 14px;
                    border-radius: 50%;
                    background: var(--thumb-color, var(--accent));
                    cursor: pointer;
                    border: none;
                  }
                `}</style>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
