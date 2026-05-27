import { notFound } from "next/navigation";
import {
  getProjectById,
  getPostsByProjectId,
  getUserById,
} from "@/lib/data";
import PostCard from "@/components/PostCard";
import ProjectDetailHeader from "@/components/ProjectDetailHeader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const user = getUserById(project.userId)!;
  const posts = getPostsByProjectId(id);
  const firstProgress = posts[0]?.progress ?? 0;

  const startDate = new Date(project.startedAt);
  const formattedStart = `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日`;

  return (
    <div className="py-2">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        <ArrowLeft size={14} />
        <span>タイムラインに戻る</span>
      </Link>

      <ProjectDetailHeader
        project={project}
        user={user}
        postsCount={posts.length}
        firstProgress={firstProgress}
        formattedStart={formattedStart}
      />

      {/* Timeline section */}
      <div>
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          進捗タイムライン
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[18px] top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />

          <div className="flex flex-col gap-0">
            {posts.map((post, index) => {
              const prevProgress = index > 0 ? posts[index - 1].progress : 0;
              const delta = post.progress - prevProgress;

              return (
                <div key={post.id} className="relative pl-10 pb-6">
                  {/* Timeline dot */}
                  <div
                    className="absolute left-3 top-4 w-3 h-3 rounded-full ring-2"
                    style={{
                      background: index === posts.length - 1 ? "var(--accent)" : "var(--bg-card)",
                      border: `2px solid ${index === posts.length - 1 ? "var(--accent)" : "var(--border)"}`,
                    }}
                  />

                  {/* Delta badge */}
                  {index > 0 && delta > 0 && (
                    <div
                      className="absolute left-6 top-3.5 text-xs px-1.5 py-0.5 rounded font-mono"
                      style={{
                        background: "var(--accent-glow)",
                        color: "var(--accent)",
                        fontSize: "10px",
                      }}
                    >
                      +{delta}%
                    </div>
                  )}

                  <PostCard
                    post={post}
                    project={project}
                    user={user}
                    showProjectLink={false}
                  />
                </div>
              );
            })}

            {/* End dot — "続く" */}
            <div className="relative pl-10">
              <div
                className="absolute left-3 top-1 w-3 h-3 rounded-full border-2"
                style={{
                  borderColor: "var(--accent-dim)",
                  borderStyle: "dashed",
                }}
              />
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                次の進捗を記録しよう…
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
