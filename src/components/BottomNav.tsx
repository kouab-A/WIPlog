"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const isHome    = pathname === "/";
  const isProfile = pathname === "/profile";

  const items = [
    { href: "/",        icon: Home,       label: "ホーム",      active: isHome },
    { href: "/#post-form", icon: PlusCircle, label: "記録する",  active: false },
    { href: "/profile", icon: User,       label: "プロフィール", active: isProfile },
  ];

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
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-opacity active:opacity-60"
          style={{ color: item.active ? "var(--accent)" : "var(--text-muted)" }}
        >
          <item.icon size={22} strokeWidth={item.active ? 2.5 : 1.5} />
          <span className="text-[11px]">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
