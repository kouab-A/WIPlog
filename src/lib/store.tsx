"use client";

import {
  createContext, useContext, useState, useEffect, useCallback, ReactNode,
} from "react";
import {
  User, Post, Project,
  users as seedUsers, posts as seedPosts, projects as seedProjects,
} from "./data";

export const ME_USER_ID = "u1";

type AddPostParams = {
  projectId?: string;
  projectTitle?: string;
  progress: number;
  content: string;
};

type DataContextValue = {
  posts: Post[];
  projects: Project[];
  users: User[];
  addPost: (params: AddPostParams) => void;
  getUserById: (id: string) => User | undefined;
  getProjectById: (id: string) => Project | undefined;
  getPostsByProjectId: (projectId: string) => Post[];
  getLatestPostsForTimeline: () => Array<Post & { project: Project; user: User }>;
};

const DataContext = createContext<DataContextValue | null>(null);

const COVER_COLORS = ["#1e1b4b", "#0f172a", "#1c1917", "#172554", "#14532d", "#3b0764", "#1e3a5f"];
const STORAGE_VERSION = "v2";

export function DataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(seedPosts);
  const [projects, setProjects] = useState<Project[]>(seedProjects);

  useEffect(() => {
    if (localStorage.getItem("wiplog-version") !== STORAGE_VERSION) {
      localStorage.removeItem("wiplog-posts");
      localStorage.removeItem("wiplog-projects");
      localStorage.setItem("wiplog-version", STORAGE_VERSION);
      return;
    }
    try {
      const sp = localStorage.getItem("wiplog-posts");
      const sj = localStorage.getItem("wiplog-projects");
      if (sp) setPosts(JSON.parse(sp));
      if (sj) setProjects(JSON.parse(sj));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("wiplog-posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("wiplog-projects", JSON.stringify(projects));
  }, [projects]);

  const addPost = useCallback(({ projectId, projectTitle, progress, content }: AddPostParams) => {
    let resolvedId = projectId;
    let newProject: Project | null = null;

    if (!resolvedId && projectTitle) {
      const existing = projects.find(
        (p) => p.title.toLowerCase() === projectTitle.trim().toLowerCase()
      );
      if (existing) {
        resolvedId = existing.id;
      } else {
        newProject = {
          id: `p_${Date.now()}`,
          userId: ME_USER_ID,
          title: projectTitle.trim(),
          description: "",
          category: "その他",
          currentProgress: progress,
          startedAt: new Date().toISOString().split("T")[0],
          coverColor: COVER_COLORS[Math.floor(Math.random() * COVER_COLORS.length)],
        };
        resolvedId = newProject.id;
      }
    }

    if (!resolvedId) return;

    const newPost: Post = {
      id: `post_${Date.now()}`,
      projectId: resolvedId,
      userId: ME_USER_ID,
      progress,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    setPosts((prev) => [...prev, newPost]);
    setProjects((prev) => {
      const base = newProject ? [...prev, newProject] : [...prev];
      return base.map((p) =>
        p.id === resolvedId ? { ...p, currentProgress: progress } : p
      );
    });
  }, [projects]);

  const getUserById = useCallback(
    (id: string) => seedUsers.find((u) => u.id === id),
    []
  );

  const getProjectById = useCallback(
    (id: string) => projects.find((p) => p.id === id),
    [projects]
  );

  const getPostsByProjectId = useCallback(
    (projectId: string) =>
      posts
        .filter((p) => p.projectId === projectId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [posts]
  );

  const getLatestPostsForTimeline = useCallback(() => {
    const latest = new Map<string, Post>();
    for (const post of posts) {
      const cur = latest.get(post.projectId);
      if (!cur || new Date(post.createdAt) > new Date(cur.createdAt)) {
        latest.set(post.projectId, post);
      }
    }
    return Array.from(latest.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((post) => ({
        ...post,
        project: projects.find((p) => p.id === post.projectId)!,
        user: seedUsers.find((u) => u.id === post.userId)!,
      }))
      .filter((item) => item.project && item.user);
  }, [posts, projects]);

  return (
    <DataContext.Provider value={{
      posts, projects, users: seedUsers,
      addPost, getUserById, getProjectById, getPostsByProjectId, getLatestPostsForTimeline,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
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
