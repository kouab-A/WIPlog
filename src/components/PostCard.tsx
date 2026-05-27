"use client";

import Link from "next/link";
import { MessageSquare, ExternalLink, Heart } from "lucide-react";
import type { Post, Project, User } from "@/lib/data";
import { formatRelativeDate } from "@/lib/data";
import ProgressBar from "./ProgressBar";
import { useFavorites } from "./FavoritesProvider";

type Props = {
  post:            Post;
  project:         Project;
  user:            User;
  showProjectLink?: boolean;
};

export default function PostCard({ post, project, user, showProjectLink = true }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(post.id);

  return (
    <article
      className="rounded-xl p-5 transition-all duration-200 hover:translate-y-[-1px]"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{ background: user.avatarColor }}
        >
          {user.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              {user.name}
            </span>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              @{user.handle}
            </span>
            <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
              {formatRelativeDate(post.createdAt)}
            </span>
          </div>

          {showProjectLink && (
            <Link
              href={`/projects/${project.id}`}
              className="text-xs mt-0.5 flex items-center gap-1 w-fit group"
              style={{ color: "var(--accent)" }}
            >
              <span className="group-hover:underline">{project.title}</span>
              <ExternalLink size={10} />
            </Link>
          )}
        </div>
      </div>

      {/* Progress badge */}
      <div className="mb-3">
        <div
          className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full"
          style={{ background: "var(--accent-glow)", color: "var(--accent)" }}
        >
          <span className="font-mono font-bold">{post.progress}%</span>
          <span>達成</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <ProgressBar progress={post.progress} size="sm" showLabel={false} />
      </div>

      {/* Content */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {post.content}
      </p>

      {/* Image placeholder */}
      {post.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.imageUrl}
          alt="進捗画像"
          className="mt-4 w-full rounded-lg object-cover"
          style={{ maxHeight: "240px" }}
        />
      ) : (
        <div
          className="mt-4 w-full rounded-lg flex items-center justify-center"
          style={{
            height: "120px",
            background: "var(--bg-elevated)",
            border: "1px dashed var(--border)",
          }}
        >
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            制作物の画像をここに
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center gap-3">
        <button
          className="flex items-center gap-1.5 text-xs transition-colors hover:opacity-80"
          style={{ color: "var(--text-muted)" }}
        >
          <MessageSquare size={13} />
          <span>応援する</span>
        </button>

        {/* Favorite button */}
        <button
          onClick={() => toggleFavorite(post.id)}
          className="flex items-center gap-1.5 text-xs transition-all hover:scale-110"
          style={{ color: favorited ? "var(--accent)" : "var(--text-muted)" }}
          title={favorited ? "お気に入りから削除" : "お気に入りに追加"}
        >
          <Heart
            size={13}
            fill={favorited ? "currentColor" : "none"}
            strokeWidth={favorited ? 0 : 1.5}
          />
          <span>{favorited ? "保存済み" : "保存"}</span>
        </button>

        <div className="ml-auto flex items-center gap-1">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            プロジェクト全体:
          </span>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: "var(--accent)" }}
          >
            {project.currentProgress}%
          </span>
        </div>
      </div>
    </article>
  );
}
