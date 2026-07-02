"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuickInputBar from "@/components/Dashboard/QuickInputBar";
import FocusView     from "@/components/Dashboard/FocusView";
import OverviewView  from "@/components/Dashboard/OverviewView";

type Mode = "focus" | "overview";

export default function DashboardPage() {
  const [mode, setMode] = useState<Mode>("focus");

  return (
    <div className="py-4 flex flex-col gap-6">

      {/* Quick input bar */}
      <QuickInputBar />

      {/* Mode toggle */}
      <div
        className="flex p-1 rounded-xl"
        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
      >
        {(["focus", "overview"] as const).map((m) => {
          const labels: Record<Mode, { short: string; long: string }> = {
            focus:    { short: "フォーカス",   long: "今日" },
            overview: { short: "オーバービュー", long: "全体" },
          };
          const active = mode === m;
          return (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 relative flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ color: active ? "var(--text-primary)" : "var(--text-muted)" }}
            >
              {active && (
                <motion.div
                  layoutId="mode-bg"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "var(--bg-card)", boxShadow: "0 1px 6px rgba(0,0,0,0.12)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}
              <span className="relative z-10">{labels[m].short}</span>
              <span
                className="relative z-10 text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: active ? "var(--accent-glow)" : "transparent",
                  color:      active ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                {labels[m].long}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {mode === "focus" ? <FocusView /> : <OverviewView />}
        </motion.div>
      </AnimatePresence>

    </div>
  );
}
