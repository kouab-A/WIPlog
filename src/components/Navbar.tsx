"use client";

import Link from "next/link";
import { Layers, Home, PlusCircle, Sun, Moon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "var(--navbar-bg)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between w-full">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)" }}
          >
            <Layers size={14} className="text-white" />
          </div>
          <span style={{ color: "var(--text-primary)" }}>WIPlog</span>
          <span
            className="text-xs font-normal px-1.5 py-0.5 rounded"
            style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
          >
            β
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {/* ライト / ダーク切替 */}
          <button
            onClick={toggleColorMode}
            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: "var(--text-muted)" }}
            title={colorMode === "light" ? "ダークモードに切替" : "ライトモードに切替"}
          >
            {colorMode === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <ThemeSelector />

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-black/5"
            style={{ color: "var(--text-secondary)" }}
          >
            <Home size={15} />
            <span>タイムライン</span>
          </Link>
          <Link
            href="/post"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ml-1"
            style={{
              background: "var(--accent)",
              color: "white",
            }}
          >
            <PlusCircle size={15} />
            <span>記録する</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
