"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { DEMO_PROJECTS, DEMO_HISTORIES } from "@/lib/demoData";
import ContributionGraph from "./ContributionGraph";

export default function FocusView() {
  const [selectedId, setSelectedId] = useState(DEMO_PROJECTS[0].id);
  const [displayed,  setDisplayed]  = useState(0);

  const project = DEMO_PROJECTS.find((p) => p.id === selectedId)!;
  const history = DEMO_HISTORIES[selectedId];
  const latest  = history[history.length - 1];
  const delta   = latest.delta;
  const target  = project.currentProgress;
  const base    = target - delta;

  // Animate number counter
  useEffect(() => {
    setDisplayed(0);
    let start: number | null = null;
    const duration = 1200;

    const step = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      setDisplayed(Math.round(eased * target));
      if (pct < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [selectedId, target]);

  return (
    <div className="flex flex-col gap-6">
      {/* Project selector tabs */}
      <div className="flex gap-2 flex-wrap">
        {DEMO_PROJECTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all"
            style={{
              background: selectedId === p.id ? p.color : "var(--bg-elevated)",
              color:      selectedId === p.id ? "white" : "var(--text-secondary)",
              border:     `1px solid ${selectedId === p.id ? "transparent" : "var(--border)"}`,
              fontWeight: selectedId === p.id ? 600 : 400,
              boxShadow:  selectedId === p.id ? `0 4px 12px ${p.color}40` : "none",
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: selectedId === p.id ? "rgba(255,255,255,0.7)" : p.color }}
            />
            {p.title}
          </button>
        ))}
      </div>

      {/* Project info */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-5"
        >
          {/* Title + category */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{project.title}</h2>
              <span
                className="text-xs px-2 py-0.5 rounded mt-1 inline-block"
                style={{ background: `${project.color}18`, color: project.color }}
              >
                {project.category}
              </span>
            </div>
            <div className="text-right shrink-0">
              <div className="text-4xl font-mono font-black tabular-nums" style={{ color: project.color }}>
                {displayed}<span className="text-2xl">%</span>
              </div>
              <div
                className="flex items-center gap-1 text-xs font-semibold mt-0.5 justify-end"
                style={{ color: project.color }}
              >
                <TrendingUp size={12} />
                +{delta}% 今回
              </div>
            </div>
          </div>

          {/* Giant progress bar */}
          <div>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ height: "72px", background: "var(--bg-elevated)" }}
            >
              {/* Base fill */}
              <motion.div
                key={`base-${selectedId}`}
                className="absolute left-0 top-0 h-full rounded-2xl"
                style={{ background: `${project.color}70` }}
                initial={{ width: 0 }}
                animate={{ width: `${base}%` }}
                transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
              />
              {/* Delta highlight */}
              <motion.div
                key={`delta-${selectedId}`}
                className="absolute top-0 h-full"
                style={{
                  left:       `${base}%`,
                  background: project.color,
                  boxShadow:  `4px 0 20px ${project.color}80`,
                }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${delta}%`, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
              />
              {/* Shimmer on delta */}
              <motion.div
                key={`shimmer-${selectedId}`}
                className="absolute top-0 h-full w-8"
                style={{
                  left:       `${base}%`,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: `${delta * 6}px`, opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: 1.4 }}
              />
              {/* "+N% label" */}
              <AnimatePresence>
                <motion.div
                  key={`badge-${selectedId}`}
                  className="absolute top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    left:       `${base + delta / 2}%`,
                    transform:  "translate(-50%, -50%)",
                    background: "white",
                    color:      project.color,
                    whiteSpace: "nowrap",
                    boxShadow:  `0 2px 8px rgba(0,0,0,0.15)`,
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
                >
                  +{delta}%
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scale */}
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>0%</span>
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>100%</span>
            </div>
          </div>

          {/* Latest entry */}
          <div
            className="rounded-xl p-4"
            style={{
              background: `${project.color}0d`,
              border:     `1px solid ${project.color}30`,
            }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: project.color }}>最新の記録</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {latest.content}
            </p>
          </div>

          {/* Contribution graph */}
          <div
            className="rounded-xl p-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
          >
            <ContributionGraph accent={project.color} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
