"use client";

import { useState } from "react";
import { PanelLeft, PanelRight, X } from "lucide-react";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [leftOpen,  setLeftOpen]  = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="flex max-w-[1200px] mx-auto w-full px-4 gap-5 pt-6 pb-28 lg:pb-12 items-start relative">

      {/* Left sidebar — desktop always visible, mobile as drawer */}
      <aside className="hidden lg:block w-60 shrink-0 sticky top-[64px] max-h-[calc(100vh-72px)] overflow-y-auto">
        <LeftSidebar />
      </aside>

      {/* Left drawer overlay (mobile) */}
      {leftOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setLeftOpen(false)}
        />
      )}
      <aside
        className="fixed top-0 left-0 h-full z-50 w-72 pt-[72px] pb-6 px-4 overflow-y-auto lg:hidden transition-transform duration-300"
        style={{
          background: "var(--bg-base)",
          borderRight: "1px solid var(--border)",
          transform: leftOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex justify-end mb-3">
          <button onClick={() => setLeftOpen(false)} style={{ color: "var(--text-muted)" }}>
            <X size={18} />
          </button>
        </div>
        <LeftSidebar />
      </aside>

      {/* Center content */}
      <main className="flex-1 min-w-0">
        {children}
      </main>

      {/* Right sidebar — desktop always visible, mobile as drawer */}
      <aside className="hidden xl:block w-60 shrink-0 sticky top-[64px] max-h-[calc(100vh-72px)] overflow-y-auto">
        <RightSidebar />
      </aside>

      {/* Right drawer overlay (mobile) */}
      {rightOpen && (
        <div
          className="fixed inset-0 z-40 xl:hidden"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setRightOpen(false)}
        />
      )}
      <aside
        className="fixed top-0 right-0 h-full z-50 w-72 pt-[72px] pb-6 px-4 overflow-y-auto xl:hidden transition-transform duration-300"
        style={{
          background: "var(--bg-base)",
          borderLeft: "1px solid var(--border)",
          transform: rightOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex justify-start mb-3">
          <button onClick={() => setRightOpen(false)} style={{ color: "var(--text-muted)" }}>
            <X size={18} />
          </button>
        </div>
        <RightSidebar />
      </aside>

      {/* Toggle buttons — fixed to viewport edges, hidden when sidebar is native */}
      <button
        onClick={() => { setLeftOpen(true); setRightOpen(false); }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-30 lg:hidden flex items-center justify-center w-7 h-12 rounded-r-xl shadow-md transition-all"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderLeft: "none",
          color: "var(--text-muted)",
        }}
        aria-label="左サイドバーを開く"
      >
        <PanelLeft size={15} />
      </button>

      <button
        onClick={() => { setRightOpen(true); setLeftOpen(false); }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 xl:hidden flex items-center justify-center w-7 h-12 rounded-l-xl shadow-md transition-all"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRight: "none",
          color: "var(--text-muted)",
        }}
        aria-label="右サイドバーを開く"
      >
        <PanelRight size={15} />
      </button>

    </div>
  );
}
