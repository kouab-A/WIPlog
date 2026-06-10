export type User = {
  id: string;
  name: string;
  handle: string;
  avatarColor: string;
  avatarImageUrl?: string;
};

export type Post = {
  id: string;
  projectId: string;
  userId: string;
  progress: number;
  content: string;
  imageUrl?: string;
  createdAt: string;
};

export type Project = {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  currentProgress: number;
  startedAt: string;
  coverColor: string;
};

export const users: User[] = [
  { id: "u1", name: "Haruto Nakamura", handle: "haruto_3d", avatarColor: "#6366f1" },
  { id: "u2", name: "Yui Tanaka", handle: "yui_dev", avatarColor: "#ec4899" },
  { id: "u3", name: "Kenji Sato", handle: "kenji_music", avatarColor: "#f59e0b" },
  { id: "u4", name: "Akira Suzuki", handle: "akira_illust", avatarColor: "#10b981" },
  { id: "u5", name: "Mio Yoshida", handle: "mio_game", avatarColor: "#8b5cf6" },
];

export const projects: Project[] = [];

export const posts: Post[] = [];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getPostsByProjectId(projectId: string): Post[] {
  return posts.filter((p) => p.projectId === projectId).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

export function getLatestPostsForTimeline(): Array<Post & { project: Project; user: User }> {
  const latestByProject = new Map<string, Post>();
  for (const post of posts) {
    const existing = latestByProject.get(post.projectId);
    if (!existing || new Date(post.createdAt) > new Date(existing.createdAt)) {
      latestByProject.set(post.projectId, post);
    }
  }
  return Array.from(latestByProject.values())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map((post) => ({
      ...post,
      project: getProjectById(post.projectId)!,
      user: getUserById(post.userId)!,
    }));
}

export function formatRelativeDate(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours   = Math.floor(diff / 3600000);
  const days    = Math.floor(diff / 86400000);
  if (minutes < 1)  return "たった今";
  if (minutes < 60) return `${minutes}分前`;
  if (hours   < 24) return `${hours}時間前`;
  if (days    === 1) return "1日前";
  if (days    < 7)  return `${days}日前`;
  if (days    < 30) return `${Math.floor(days / 7)}週間前`;
  return `${Math.floor(days / 30)}ヶ月前`;
}
