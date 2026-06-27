"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useData } from "@/lib/store";
import PostForm from "./PostForm";

export default function PostModal() {
  const { isPostModalOpen, setIsPostModalOpen } = useData();

  // ESCキーで閉じる
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPostModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setIsPostModalOpen]);

  // 開いている間はスクロールをロック
  useEffect(() => {
    if (isPostModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isPostModalOpen]);

  if (!isPostModalOpen) return null;

  return (
    <>
      {/* Backdrop + wrapper（外クリックで閉じる） */}
      <div
        className="fixed inset-0 z-[310] flex items-center justify-center px-4 py-6"
        style={{ background: "rgba(0,0,0,0.5)" }}
        onClick={() => setIsPostModalOpen(false)}
      >
        <div
          className="relative rounded-2xl overflow-hidden w-full"
          style={{ maxWidth: "560px", background: "var(--bg-base)", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 pt-4 pb-2"
            style={{ borderBottom: "1px solid var(--border-subtle)" }}
          >
            <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
              今日の進捗を記録する
            </span>
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-black/10"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-1 pb-1">
            <PostForm onSuccess={() => setIsPostModalOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}
