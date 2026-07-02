"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenLine, ChevronDown, Send, ImagePlus, CheckCircle2, X } from "lucide-react";
import { useData } from "@/lib/store";
import { DEMO_PROJECTS } from "@/lib/demoData";

const EASE = [0.04, 0.62, 0.23, 0.98] as const;

export default function QuickInputBar() {
  const { addPost } = useData();

  const [isOpen,     setIsOpen]     = useState(false);
  const [projectId,  setProjectId]  = useState(DEMO_PROJECTS[0].id);
  const [progress,   setProgress]   = useState(DEMO_PROJECTS[0].currentProgress);
  const [content,    setContent]    = useState("");
  const [done,       setDone]       = useState(false);

  const selectedProject = DEMO_PROJECTS.find((p) => p.id === projectId) ?? DEMO_PROJECTS[0];

  const open = () => setIsOpen(true);
  const close = () => { setIsOpen(false); setContent(""); };

  const handleProjectChange = (id: string) => {
    setProjectId(id);
    const p = DEMO_PROJECTS.find((p) => p.id === id);
    if (p) setProgress(p.currentProgress);
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    addPost({ projectTitle: selectedProject.title, progress, content });
    setDone(true);
    setContent("");
    setTimeout(() => { setDone(false); setIsOpen(false); }, 1800);
  };

  const progressLabel =
    progress < 20  ? "スタート地点！よく踏み出した"
    : progress < 40 ? "着々と前進している"
    : progress < 60 ? "折り返し地点が見えてきた"
    : progress < 80 ? "かなり形になってきた"
    : "もうすぐ完成の予感";

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-20"
            style={{ backdropFilter: "blur(2px)", background: "rgba(0,0,0,0.35)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/* Bar */}
      <motion.div
        layout
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border:     `1px solid ${isOpen ? selectedProject.color + "55" : "var(--border)"}`,
          boxShadow:  isOpen ? `0 0 0 2px ${selectedProject.color}22, 0 8px 32px rgba(0,0,0,0.15)` : "none",
          zIndex:     isOpen ? 30 : "auto",
          position:   isOpen ? "relative" : "static",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
      >
        {/* Collapsed trigger */}
        {!isOpen ? (
          <button
            onClick={open}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
              style={{ background: "var(--accent-glow)" }}
            >
              <PenLine size={14} style={{ color: "var(--accent)" }} />
            </div>
            <span className="text-sm flex-1" style={{ color: "var(--text-muted)" }}>
              今日の進捗を記録しよう…
            </span>
            <ChevronDown size={15} style={{ color: "var(--text-muted)" }} />
          </button>
        ) : (
          /* Expanded form */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 pt-3.5 pb-2"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                進捗を記録
              </span>
              <button onClick={close} className="p-1 rounded-lg hover:bg-black/10 transition-colors" style={{ color: "var(--text-muted)" }}>
                <X size={14} />
              </button>
            </div>

            <div className="px-4 pt-3 pb-4 flex flex-col gap-4">
              {/* Project selector */}
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "var(--text-muted)" }}>プロジェクト</label>
                <div className="flex flex-wrap gap-2">
                  {DEMO_PROJECTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleProjectChange(p.id)}
                      className="text-xs px-3 py-1.5 rounded-full transition-all"
                      style={{
                        background: projectId === p.id ? p.color : "var(--bg-elevated)",
                        color:      projectId === p.id ? "white" : "var(--text-secondary)",
                        border:     `1px solid ${projectId === p.id ? "transparent" : "var(--border)"}`,
                        fontWeight: projectId === p.id ? 600 : 400,
                      }}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>進捗度</label>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-mono font-bold tabular-nums" style={{ color: selectedProject.color }}>
                      {progress}
                    </span>
                    <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>%</span>
                  </div>
                </div>
                <input
                  type="range" min={1} max={99} value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(90deg, ${selectedProject.color} ${progress}%, var(--border) ${progress}%)`,
                    "--thumb-color": selectedProject.color,
                  } as React.CSSProperties}
                />
                <p className="text-xs mt-1.5 text-center" style={{ color: "var(--text-muted)" }}>{progressLabel}</p>
              </div>

              {/* Content */}
              <div>
                <label className="text-xs font-medium mb-2 block" style={{ color: "var(--text-muted)" }}>今日できたこと</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="未完成でいい。今日の一歩を書いてみよう。"
                  rows={3}
                  autoFocus
                  className="w-full rounded-xl px-3 py-2.5 text-sm resize-none outline-none"
                  style={{
                    background: "var(--bg-elevated)",
                    border:     "1px solid var(--border)",
                    color:      "var(--text-primary)",
                  }}
                  onFocus={(e)  => { e.currentTarget.style.borderColor = selectedProject.color; }}
                  onBlur={(e)   => { e.currentTarget.style.borderColor = "var(--border)"; }}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors"
                  style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
                >
                  <ImagePlus size={14} />
                  <span>画像を追加</span>
                </button>

                {done ? (
                  <span className="ml-auto flex items-center gap-1.5 text-sm font-semibold" style={{ color: selectedProject.color }}>
                    <CheckCircle2 size={16} /> 記録しました！
                  </span>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="ml-auto flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                    style={{
                      background: content.trim() ? selectedProject.color : "var(--bg-elevated)",
                      color:      content.trim() ? "white" : "var(--text-muted)",
                      cursor:     content.trim() ? "pointer" : "not-allowed",
                    }}
                  >
                    <Send size={14} />
                    記録する
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none; width: 18px; height: 18px;
          border-radius: 50%; background: var(--thumb-color, var(--accent));
          cursor: pointer; box-shadow: 0 0 0 3px color-mix(in srgb, var(--thumb-color, var(--accent)) 20%, transparent);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: var(--thumb-color, var(--accent)); cursor: pointer; border: none;
        }
      `}</style>
    </>
  );
}
