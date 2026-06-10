"use client";

import { useState } from "react";
import { Send, ImagePlus, CheckCircle2 } from "lucide-react";
import { useData } from "@/lib/store";

export default function PostForm() {
  const { addPost } = useData();

  const [progress,     setProgress]     = useState(30);
  const [content,      setContent]      = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [done,         setDone]         = useState(false);

  const progressLabel =
    progress < 20 ? "スタート地点！よく踏み出した"
    : progress < 40 ? "着々と進んでいる"
    : progress < 60 ? "折り返し地点が見えてきた"
    : progress < 80 ? "かなり形になってきた"
    : "もうすぐ完成の予感";

  const canSubmit = content.trim() !== "" && projectTitle.trim() !== "";

  const handleSubmit = () => {
    if (!canSubmit) return;
    addPost({ projectTitle, progress, content });
    setContent("");
    setProjectTitle("");
    setProgress(30);
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  };

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <h2
        className="text-sm font-semibold mb-5 flex items-center gap-2"
        style={{ color: "var(--text-secondary)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        今日の進捗を記録する
      </h2>

      {/* Project name input */}
      <div className="mb-4">
        <label
          className="text-xs font-medium mb-1.5 block"
          style={{ color: "var(--text-muted)" }}
        >
          プロジェクト名
        </label>
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="例：3Dキャラクターのモデリング"
          className="w-full rounded-lg px-3 py-2.5 text-sm outline-none transition-colors"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
        />
      </div>

      {/* Progress slider */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            今の進捗度
          </label>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-mono font-bold tabular-nums" style={{ color: "var(--accent)" }}>
              {progress}
            </span>
            <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>%</span>
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={99}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(90deg, var(--accent) ${progress}%, var(--border) ${progress}%)`,
            "--thumb-color": "var(--accent)",
          } as React.CSSProperties}
        />

        <p className="text-xs mt-2 text-center" style={{ color: "var(--text-muted)" }}>
          {progressLabel}
        </p>
      </div>

      {/* Content */}
      <div className="mb-4">
        <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>
          今日できたこと・気づいたこと
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="未完成でいい。今日の一歩を記録しよう。"
          rows={3}
          className="w-full rounded-lg px-3 py-2.5 text-sm resize-none outline-none transition-colors"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors"
          style={{
            background: "var(--bg-elevated)",
            color: "var(--text-muted)",
            border: "1px solid var(--border)",
          }}
        >
          <ImagePlus size={14} />
          <span>画像を追加</span>
        </button>

        {done ? (
          <span
            className="ml-auto flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "var(--accent)" }}
          >
            <CheckCircle2 size={16} />
            記録しました！
          </span>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="ml-auto flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: canSubmit ? "var(--accent)" : "var(--accent-dim)",
              color: canSubmit ? "white" : "var(--text-muted)",
              cursor: canSubmit ? "pointer" : "not-allowed",
            }}
          >
            <Send size={14} />
            <span>進捗を記録する</span>
          </button>
        )}
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: var(--thumb-color, var(--accent));
          cursor: pointer;
          box-shadow: 0 0 0 3px var(--accent-glow);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: var(--thumb-color, var(--accent));
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
