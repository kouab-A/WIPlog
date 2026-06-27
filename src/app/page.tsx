"use client";

import { useData } from "@/lib/store";
import PostCard from "@/components/PostCard";
import { ArrowRight, PlusCircle, Pencil } from "lucide-react";

export default function HomePage() {
  const { getLatestPostsForTimeline, hasTodayPost, setIsPostModalOpen } = useData();
  const timelinePosts = getLatestPostsForTimeline();

  return (
    <div className="py-2">

      {/* 今日未記録バナー */}
      {!hasTodayPost && (
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="w-full mb-6 rounded-xl p-4 flex items-center gap-4 text-left transition-all hover:opacity-90 active:scale-[0.99]"
          style={{
            background: "linear-gradient(135deg, var(--accent) 0%, #a78bfa 100%)",
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <Pencil size={18} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white">今日の進捗を記録しよう</p>
            <p className="text-xs text-white/70 mt-0.5">未完成でいい。今日の一歩を残そう。</p>
          </div>
          <PlusCircle size={20} className="text-white/80 shrink-0" />
        </button>
      )}

      {/* タイムライン */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            タイムライン
          </h2>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {timelinePosts.length}件の進捗
          </span>
        </div>

        {timelinePosts.length === 0 ? (
          <div
            className="rounded-xl p-10 text-center"
            style={{ border: "1px dashed var(--border)" }}
          >
            <p className="text-sm mb-1" style={{ color: "var(--text-muted)" }}>
              まだ投稿がありません
            </p>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              最初の進捗を記録してみましょう
            </p>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "var(--accent)", color: "white" }}
            >
              <PlusCircle size={14} />
              記録する
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {timelinePosts.map((item) => (
                <PostCard
                  key={item.id}
                  post={item}
                  project={item.project}
                  user={item.user}
                  showProjectLink={true}
                />
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                className="flex items-center gap-2 mx-auto text-sm px-4 py-2 rounded-lg transition-colors"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <span>もっと見る</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* FAB — 記録するボタン（画面右下固定） */}
      <button
        onClick={() => setIsPostModalOpen(true)}
        className="fixed right-4 z-[90] flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
        style={{
          bottom: "calc(56px + 16px)",
          background: "var(--accent)",
          color: "white",
          boxShadow: "0 4px 20px rgba(124,106,248,0.5)",
        }}
        aria-label="進捗を記録する"
      >
        <PlusCircle size={18} />
        <span className="text-sm font-semibold">記録する</span>
      </button>

    </div>
  );
}
