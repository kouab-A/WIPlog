"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData, type UserProfile } from "@/lib/store";
import { ArrowLeft, Camera, Check, Shuffle } from "lucide-react";
import Link from "next/link";

const AVATAR_COLORS = [
  "#6366f1", "#ec4899", "#f59e0b", "#10b981",
  "#8b5cf6", "#ef4444", "#3b82f6", "#14b8a6",
];

export default function ProfilePage() {
  const { profile, updateProfile } = useData();
  const router = useRouter();

  const [draft, setDraft]   = useState<UserProfile>(profile);
  const [saved, setSaved]   = useState(false);
  const fileRef             = useRef<HTMLInputElement>(null);

  useEffect(() => { setDraft(profile); }, [profile]);

  const isDirty =
    draft.name         !== profile.name     ||
    draft.handle       !== profile.handle   ||
    draft.bio          !== profile.bio      ||
    draft.avatarColor  !== profile.avatarColor ||
    draft.avatarImageUrl !== profile.avatarImageUrl;

  const handleSave = () => {
    if (!draft.name.trim() || !draft.handle.trim()) return;
    updateProfile({ ...draft, handle: draft.handle.replace(/^@/, "") });
    setSaved(true);
    setTimeout(() => { setSaved(false); router.push("/"); }, 1200);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setDraft((d) => ({ ...d, avatarImageUrl: ev.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => setDraft((d) => ({ ...d, avatarImageUrl: undefined }));

  const shuffleColor = () => {
    const next = AVATAR_COLORS.filter((c) => c !== draft.avatarColor);
    setDraft((d) => ({ ...d, avatarColor: next[Math.floor(Math.random() * next.length)] }));
  };

  const initial = draft.name.trim()[0] ?? "?";

  return (
    <div className="max-w-xl mx-auto py-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
          style={{ color: "var(--text-muted)", background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <ArrowLeft size={15} />
        </Link>
        <h1 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
          プロフィールを編集
        </h1>
      </div>

      {/* Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
      >
        {/* Banner */}
        <div
          className="h-28 w-full"
          style={{
            background: `linear-gradient(135deg, ${draft.avatarColor}88 0%, ${draft.avatarColor}22 100%)`,
          }}
        />

        {/* Avatar area */}
        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-5">
            {/* Avatar */}
            <div className="relative group">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ring-4 overflow-hidden cursor-pointer"
                style={{
                  background: draft.avatarColor,
                  border: "4px solid var(--bg-card)",
                }}
                onClick={() => fileRef.current?.click()}
              >
                {draft.avatarImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={draft.avatarImageUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white">{initial}</span>
                )}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(0,0,0,0.45)" }}
                >
                  <Camera size={20} className="text-white" />
                </div>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Avatar controls */}
            <div className="flex items-center gap-2 mb-1">
              {draft.avatarImageUrl && (
                <button
                  onClick={removeImage}
                  className="text-xs px-3 py-1.5 rounded-full transition-colors"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    background: "var(--bg-elevated)",
                  }}
                >
                  画像を削除
                </button>
              )}
              {!draft.avatarImageUrl && (
                <button
                  onClick={shuffleColor}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-colors"
                  style={{
                    border: "1px solid var(--accent-dim)",
                    color: "var(--accent)",
                    background: "var(--accent-glow)",
                  }}
                >
                  <Shuffle size={11} />
                  色を変える
                </button>
              )}
            </div>
          </div>

          {/* Color swatches */}
          {!draft.avatarImageUrl && (
            <div className="flex gap-2 mb-5">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setDraft((d) => ({ ...d, avatarColor: c }))}
                  className="w-6 h-6 rounded-full transition-transform hover:scale-110"
                  style={{
                    background: c,
                    outline: draft.avatarColor === c ? `2px solid ${c}` : "none",
                    outlineOffset: "2px",
                  }}
                />
              ))}
            </div>
          )}

          {/* Fields */}
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
                名前
              </label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                placeholder="あなたの名前"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none font-semibold"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
              />
            </div>

            {/* Handle */}
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
                ID（@ハンドル）
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-sm select-none"
                  style={{ color: "var(--text-muted)" }}
                >
                  @
                </span>
                <input
                  value={draft.handle.replace(/^@/, "")}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, handle: e.target.value.replace(/^@/, "").replace(/\s/g, "_") }))
                  }
                  placeholder="your_handle"
                  className="w-full rounded-xl pl-8 pr-4 py-2.5 text-sm outline-none"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
                自己紹介
              </label>
              <textarea
                value={draft.bio}
                onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
                placeholder="制作しているものや、自分のことを一言"
                rows={3}
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--border)"; }}
              />
              <p className="text-xs mt-1 text-right" style={{ color: "var(--text-muted)" }}>
                {draft.bio.length} / 160
              </p>
            </div>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={!isDirty || !draft.name.trim() || !draft.handle.trim()}
            className="mt-6 w-full py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
            style={{
              background: isDirty && draft.name.trim() && draft.handle.trim()
                ? (saved ? "var(--accent)" : "var(--accent)")
                : "var(--bg-elevated)",
              color: isDirty && draft.name.trim() && draft.handle.trim() ? "white" : "var(--text-muted)",
              cursor: isDirty && draft.name.trim() && draft.handle.trim() ? "pointer" : "not-allowed",
              opacity: isDirty ? 1 : 0.5,
            }}
          >
            {saved ? <><Check size={15} /> 保存しました</> : "保存する"}
          </button>
        </div>
      </div>
    </div>
  );
}
