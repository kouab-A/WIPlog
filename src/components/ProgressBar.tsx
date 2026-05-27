type Props = {
  progress:   number;
  showLabel?: boolean;
  size?:      "sm" | "md" | "lg";
};

export default function ProgressBar({ progress, showLabel = true, size = "md" }: Props) {
  const heights = { sm: "h-1", md: "h-2", lg: "h-3" };
  const clamped = Math.max(0, Math.min(99, progress));

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex-1 rounded-full overflow-hidden ${heights[size]}`}
        style={{ background: "var(--border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width:      `${clamped}%`,
            background: "var(--accent)",
            boxShadow:  "0 0 6px var(--accent-glow)",
          }}
        />
      </div>
      {showLabel && (
        <span
          className="text-sm font-mono font-bold tabular-nums"
          style={{ color: "var(--accent)", minWidth: "3rem", textAlign: "right" }}
        >
          {clamped}%
        </span>
      )}
    </div>
  );
}
