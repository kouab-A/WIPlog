"use client";

import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { themes } from "@/lib/themes";
import { useTheme } from "./ThemeProvider";

export default function ThemeSelector() {
  const { theme, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5"
        style={{ color: "var(--text-muted)" }}
        title="テーマカラーを変更"
      >
        <Palette size={15} />
        <span
          className="w-3 h-3 rounded-full"
          style={{ background: theme.swatch }}
        />
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* dropdown */}
          <div
            className="absolute right-0 top-full mt-2 z-50 rounded-xl p-2 min-w-[160px]"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <p
              className="text-xs px-2 py-1 mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              テーマカラー
            </p>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setThemeId(t.id);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5"
                style={{ color: "var(--text-primary)" }}
              >
                <span
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ background: t.swatch }}
                />
                <span>{t.label}</span>
                {theme.id === t.id && (
                  <Check size={13} className="ml-auto" style={{ color: t.swatch }} />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
