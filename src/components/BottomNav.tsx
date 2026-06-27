"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User } from "lucide-react";
import { useData } from "@/lib/store";

export default function BottomNav() {
  const pathname = usePathname();
  const { setIsPostModalOpen } = useData();
  const isHome    = pathname === "/";
  const isProfile = pathname === "/profile";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden flex items-stretch"
      style={{
        background: "var(--navbar-bg)",
        borderTop: "1px solid var(--border-subtle)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <Link
        href="/"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-opacity active:opacity-60"
        style={{ color: isHome ? "var(--accent)" : "var(--text-muted)" }}
      >
        <Home size={22} strokeWidth={isHome ? 2.5 : 1.5} />
        <span className="text-[11px]">ホーム</span>
      </Link>

      <button
        onClick={() => setIsPostModalOpen(true)}
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-opacity active:opacity-60"
        style={{ color: "var(--accent)" }}
      >
        <PlusCircle size={22} strokeWidth={1.5} />
        <span className="text-[11px]">記録する</span>
      </button>

      <Link
        href="/profile"
        className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-opacity active:opacity-60"
        style={{ color: isProfile ? "var(--accent)" : "var(--text-muted)" }}
      >
        <User size={22} strokeWidth={isProfile ? 2.5 : 1.5} />
        <span className="text-[11px]">プロフィール</span>
      </Link>
    </nav>
  );
}
