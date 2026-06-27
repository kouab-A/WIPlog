"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { useData } from "@/lib/store";
import { formatRelativeDate } from "@/lib/data";

export default function CommentPanel() {
  const {
    openCommentPostId, setOpenCommentPostId,
    posts, projects,
    getCommentsByPostId, addComment,
  } = useData();

  const [authorName, setAuthorName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("wiplog-comment-author") ?? "匿名";
    }
    return "匿名";
  });
  const [content, setContent] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const post     = posts.find((p) => p.id === openCommentPostId) ?? null;
  const project  = post ? projects.find((pr) => pr.id === post.projectId) ?? null : null;
  const comments = openCommentPostId ? getCommentsByPostId(openCommentPostId) : [];
  const isOpen   = openCommentPostId !== null && post !== null;

  // scroll to bottom when new comments arrive
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [comments.length, isOpen]);

  const handleSubmit = () => {
    if (!content.trim() || !openCommentPostId) return;
    addComment(openCommentPostId, authorName, content);
    localStorage.setItem("wiplog-comment-author", authorName);
    setContent("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[150]"
          style={{ background: "rgba(0,0,0,0.35)" }}
          onClick={() => setOpenCommentPostId(null)}
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-14 right-0 flex flex-col z-[200] transition-transform duration-300"
        style={{
          width: "min(360px, 100vw)",
          height: "calc(100dvh - 56px)",
          background: "var(--bg-card)",
          borderLeft: "1px solid var(--border-subtle)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: isOpen ? "-4px 0 24px rgba(0,0,0,0.15)" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ borderBottom: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center gap-2">
            <MessageSquare size={15} style={{ color: "var(--accent)" }} />
            <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              コメント
            </span>
            {comments.length > 0 && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-mono"
                style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
              >
                {comments.length}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpenCommentPostId(null)}
            className="flex items-center justify-center w-7 h-7 rounded-full transition-colors hover:bg-black/10"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Post context */}
        {post && project && (
          <div
            className="px-4 py-3 shrink-0"
            style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs px-2 py-0.5 rounded-full font-mono font-bold"
                style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
              >
                {post.progress}%
              </span>
              <span className="text-xs font-medium truncate" style={{ color: "var(--text-muted)" }}>
                {project.title}
              </span>
            </div>
            <p
              className="text-xs leading-relaxed line-clamp-2"
              style={{ color: "var(--text-secondary)" }}
            >
              {post.content}
            </p>
          </div>
        )}

        {/* Comments list */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 py-10">
              <MessageSquare size={28} style={{ color: "var(--border)" }} />
              <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                まだコメントがありません
                <br />
                最初のコメントを書いてみましょう
              </p>
            </div>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="rounded-xl px-3 py-2.5"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 text-white"
                    style={{ background: stringToColor(c.authorName) }}
                  >
                    {c.authorName[0]}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>
                    {c.authorName}
                  </span>
                  <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
                    {formatRelativeDate(c.createdAt)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed pl-8" style={{ color: "var(--text-secondary)" }}>
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Input form */}
        <div
          className="px-4 py-3 shrink-0 flex flex-col gap-2"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          {/* Author name */}
          <input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="名前（例：匿名）"
            className="w-full rounded-lg px-3 py-1.5 text-xs outline-none"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
          />

          {/* Comment textarea + send button */}
          <div className="flex gap-2 items-end">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="コメントを書く… (⌘+Enter で送信)"
              rows={3}
              className="flex-1 rounded-lg px-3 py-2 text-sm outline-none resize-none"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
            />
            <button
              onClick={handleSubmit}
              disabled={!content.trim()}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all shrink-0"
              style={{
                background: content.trim() ? "var(--accent)" : "var(--bg-elevated)",
                color: content.trim() ? "white" : "var(--text-muted)",
                border: content.trim() ? "none" : "1px solid var(--border)",
                cursor: content.trim() ? "pointer" : "not-allowed",
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function stringToColor(s: string): string {
  const colors = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6", "#ef4444", "#3b82f6", "#14b8a6"];
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = s.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}
