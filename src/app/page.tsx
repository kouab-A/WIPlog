import { getLatestPostsForTimeline } from "@/lib/data";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import ProjectStrip from "@/components/ProjectStrip";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export default function HomePage() {
  const timelinePosts = getLatestPostsForTimeline();

  return (
    <div className="py-2">
      {/* Hero message */}
      <div className="mb-8 text-center">
        <div
          className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full mb-4"
          style={{
            background: "var(--accent-glow)",
            border: "1px solid var(--accent-dim)",
            color: "var(--accent)",
          }}
        >
          <Zap size={11} />
          <span>未完成を、誇れ。</span>
        </div>
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          みんなの制作過程
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          完成品じゃなくていい。今日の一歩が、誰かの背中を押す。
        </p>
      </div>

      {/* Post form */}
      <div className="mb-8">
        <PostForm />
      </div>

      {/* Active projects strip */}
      <div className="mb-8">
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          進行中のプロジェクト
        </h2>
        <ProjectStrip />
      </div>

      {/* Timeline */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            グローバルタイムライン
          </h2>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {timelinePosts.length}件の進捗
          </span>
        </div>

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
      </div>
    </div>
  );
}
