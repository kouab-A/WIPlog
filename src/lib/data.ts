export type User = {
  id: string;
  name: string;
  handle: string;
  avatarColor: string;
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

export const projects: Project[] = [
  {
    id: "p1",
    userId: "u1",
    title: "3Dキャラクターモデリング",
    description: "オリジナルのSFヒーローキャラクターをBlenderで制作中。トポロジーとリギングを意識した設計にしている。",
    category: "3D / アート",
    currentProgress: 47,
    startedAt: "2026-04-10",
    coverColor: "#1e1b4b",
  },
  {
    id: "p2",
    userId: "u2",
    title: "タスク管理アプリのロジック構築",
    description: "Reactとドラッグ&ドロップで動くカンバンボード。バックエンドにSupabaseを採用。",
    category: "Web開発",
    currentProgress: 63,
    startedAt: "2026-03-22",
    coverColor: "#0f172a",
  },
  {
    id: "p3",
    userId: "u3",
    title: "インディーアルバム制作",
    description: "シンセとギターを融合させたアンビエント系の楽曲を8トラック収録予定。",
    category: "音楽",
    currentProgress: 35,
    startedAt: "2026-02-01",
    coverColor: "#1c1917",
  },
  {
    id: "p4",
    userId: "u4",
    title: "ファンタジー世界の設定画集",
    description: "オリジナルファンタジー世界の種族・建築・地形を描いた設定資料集を制作中。",
    category: "イラスト",
    currentProgress: 28,
    startedAt: "2026-04-25",
    coverColor: "#172554",
  },
  {
    id: "p5",
    userId: "u5",
    title: "2Dアクションゲーム制作",
    description: "GodotエンジンでJavaScriptライクなGDScriptを使い、横スクロールアクションを開発中。",
    category: "ゲーム開発",
    currentProgress: 19,
    startedAt: "2026-05-01",
    coverColor: "#14532d",
  },
];

export const posts: Post[] = [
  {
    id: "post1",
    projectId: "p1",
    userId: "u1",
    progress: 10,
    content: "Blenderでキャラのベースメッシュを作り始めた。まずは頭部から。顔の比率が難しい…",
    createdAt: "2026-04-10T10:00:00Z",
  },
  {
    id: "post2",
    projectId: "p1",
    userId: "u1",
    progress: 20,
    content: "胴体と腕のポリゴンが完成。サブディビジョンをかけても崩れないトポロジーを意識した。思ったより時間かかった",
    createdAt: "2026-04-18T14:30:00Z",
  },
  {
    id: "post3",
    projectId: "p1",
    userId: "u1",
    progress: 35,
    content: "脚部とブーツのモデリング完了！全身のシルエットが見えてきてかなりテンション上がってる",
    createdAt: "2026-04-28T19:00:00Z",
  },
  {
    id: "post4",
    projectId: "p1",
    userId: "u1",
    progress: 47,
    content: "UV展開が終わった…地獄だった。でもテクスチャを貼り始めたらキャラが一気に生き生きしてきた",
    createdAt: "2026-05-15T11:00:00Z",
  },
  {
    id: "post5",
    projectId: "p2",
    userId: "u2",
    progress: 15,
    content: "プロジェクト始動。とりあえずSupabaseのスキーマ設計とReactプロジェクトのセットアップが完了",
    createdAt: "2026-03-22T09:00:00Z",
  },
  {
    id: "post6",
    projectId: "p2",
    userId: "u2",
    progress: 30,
    content: "カラム（ステータス列）のUIが完成。dnd-kitでドラッグ&ドロップも動いた！思ったよりスムーズ",
    createdAt: "2026-04-05T16:00:00Z",
  },
  {
    id: "post7",
    projectId: "p2",
    userId: "u2",
    progress: 48,
    content: "Supabaseのリアルタイムサブスクリプション実装。複数タブで同時に更新が反映されるのが気持ちよすぎる",
    createdAt: "2026-04-20T20:00:00Z",
  },
  {
    id: "post8",
    projectId: "p2",
    userId: "u2",
    progress: 63,
    content: "タグ機能とフィルタリングを実装。あとは期限アラートとモバイル対応が残ってる",
    createdAt: "2026-05-10T13:00:00Z",
  },
  {
    id: "post9",
    projectId: "p3",
    userId: "u3",
    progress: 12,
    content: "1曲目のコード進行が決まった。Fmaj7→Am7→Dm7→G7のループ、なんか哀愁があって気に入ってる",
    createdAt: "2026-02-01T21:00:00Z",
  },
  {
    id: "post10",
    projectId: "p3",
    userId: "u3",
    progress: 35,
    content: "3曲完成。今日はシンセパッドの音作りに8時間費やした。方向性がやっと固まってきた気がする",
    createdAt: "2026-05-18T23:00:00Z",
  },
  {
    id: "post11",
    projectId: "p4",
    userId: "u4",
    progress: 10,
    content: "世界の神話と地理の設定を固めた。種族は5つ予定。まずはメイン種族のシルエットスケッチから",
    createdAt: "2026-04-25T10:00:00Z",
  },
  {
    id: "post12",
    projectId: "p4",
    userId: "u4",
    progress: 28,
    content: "エルフ族とドワーフ族の衣装設定画が完成！建築様式のラフも3種類描いた。色彩設計が楽しい",
    createdAt: "2026-05-20T15:00:00Z",
  },
  {
    id: "post13",
    projectId: "p5",
    userId: "u5",
    progress: 8,
    content: "Godotプロジェクト作成！とりあえず主人公がタイルマップの上を歩けるようにした",
    createdAt: "2026-05-01T18:00:00Z",
  },
  {
    id: "post14",
    projectId: "p5",
    userId: "u5",
    progress: 19,
    content: "ジャンプとダッシュの実装が完了。コヨーテタイムとジャンプバッファリングも入れた。手触りがよくなってきた",
    createdAt: "2026-05-22T20:30:00Z",
  },
];

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
  const date = new Date(dateStr);
  const now = new Date("2026-05-27T00:00:00Z");
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "今日";
  if (days === 1) return "1日前";
  if (days < 7) return `${days}日前`;
  if (days < 30) return `${Math.floor(days / 7)}週間前`;
  return `${Math.floor(days / 30)}ヶ月前`;
}
