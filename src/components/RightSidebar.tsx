"use client";

import Link from "next/link";
import { Heart, HeartOff } from "lucide-react";
import { posts, getProjectById, getUserById, formatRelativeDate } from "@/lib/data";
import { useFavorites } from "./FavoritesProvider";
import ProgressBar from "./ProgressBar";

export default function RightSidebar() {
  const { favorites, toggleFavorite } = useFavorites();

  const favoritedPosts = favorites
    .map((id) => {
      const post    = posts.find((p) => p.id === id);
      if (!post) return null;
      const project = getProjectById(post.projectId);
      const user    = getUserById(post.userId);
      if (!project || !user) return null;
      return { post, project, user };
    })
    .filter(Boolean) as Array<{
      post:    (typeof posts)[0];
      project: NonNullable<ReturnType<typeof getProjectById>>;
      user:    NonNullable<ReturnType<typeof getUserById>>;
    }>;

  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <Heart
          size={13}
          fill="currentColor"
          style={{ color: "var(--accent)" }}
        />
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          お気に入り
        </span>
        {favoritedPosts.length > 0 && (
          <span
            className="ml-auto text-xs font-mono px-1.5 py-0.5 rounded-full"
            style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
          >
            {favoritedPosts.length}
          </span>
        )}
      </div>

      {/* Empty state */}
      {favoritedPosts.length === 0 && (
        <div
          className="rounded-xl p-5 flex flex-col items-center gap-3 text-center"
          style={{
            background: "var(--bg-card)",
            border: "1px dashed var(--border)",
          }}
        >
          <Heart
            size={28}
            style={{ color: "var(--border)" }}
          />
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
            気になる投稿の
            <br />
            ♡ を押して保存しよう
          </p>
        </div>
      )}

      {/* Favorited posts */}
      {favoritedPosts.map(({ post, project, user }) => (
        <div
          key={post.id}
          className="rounded-xl p-3 transition-all hover:translate-y-[-1px]"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {/* User row */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
              style={{ background: user.avatarColor }}
            >
              {user.name[0]}
            </div>
            <span
              className="text-xs font-medium flex-1 min-w-0 truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {user.name}
            </span>
            <button
              onClick={() => toggleFavorite(post.id)}
              className="shrink-0 p-1 rounded-lg transition-colors hover:bg-red-500/10"
              title="お気に入りから削除"
              style={{ color: "var(--accent)" }}
            >
              <HeartOff size={12} />
            </button>
          </div>

          {/* Project link */}
          <Link
            href={`/projects/${project.id}`}
            className="text-xs font-medium hover:underline block mb-2 truncate"
            style={{ color: "var(--accent)" }}
          >
            {project.title}
          </Link>

          {/* Progress */}
          <div className="mb-2">
            <ProgressBar progress={post.progress} size="sm" showLabel={true} />
          </div>

          {/* Content excerpt */}
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: "var(--text-secondary)" }}
          >
            {post.content}
          </p>

          {/* Date */}
          <p
            className="text-xs mt-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            {formatRelativeDate(post.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}
