"use client";

import Link from "next/link";
import { Layers, Home, PlusCircle, Sun, Moon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import { useTheme } from "./ThemeProvider";
import { useData } from "@/lib/store";


export default function Navbar() {
  const { colorMode, toggleColorMode } = useTheme();
  const { profile, setIsPostModalOpen } = useData();

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "var(--navbar-bg)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between w-full">

        {/* Left: avatar + logo */}
        <div className="flex items-center gap-3">
          {/* Avatar button → profile page */}
          <Link
            href="/profile"
            className="group relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden transition-all hover:ring-2"
            style={{
              background: profile.avatarColor,
            }}
            title="プロフィールを編集"
          >
            {profile.avatarImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.avatarImageUrl} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-white">
                {profile.name.trim()[0] ?? "?"}
              </span>
            )}
          </Link>

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
        </div>

        <nav className="flex items-center gap-1">
          <button
            onClick={toggleColorMode}
            className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: "var(--text-muted)" }}
            title={colorMode === "light" ? "ダークモードに切替" : "ライトモードに切替"}
          >
            {colorMode === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <ThemeSelector />

          <Link
            href="/"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors hover:bg-black/5"
            style={{ color: "var(--text-secondary)" }}
          >
            <Home size={15} />
            <span>タイムライン</span>
          </Link>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ml-1"
            style={{
              background: "var(--accent)",
              color: "white",
            }}
          >
            <PlusCircle size={15} />
            <span>記録する</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
