export type DemoProject = {
  id: string;
  title: string;
  category: string;
  color: string;
  currentProgress: number;
};

export type HistoryEntry = {
  date: string;
  progress: number;
  delta: number;
  content: string;
};

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

export const DEMO_PROJECTS: DemoProject[] = [
  { id: "demo_p1", title: "3Dキャラクターモデリング", category: "3Dモデリング",   color: "#7c6af8", currentProgress: 67 },
  { id: "demo_p2", title: "ポートフォリオサイト開発", category: "コーディング",    color: "#06b6d4", currentProgress: 45 },
  { id: "demo_p3", title: "世界観設定資料集",         category: "設定資料作成",    color: "#f59e0b", currentProgress: 82 },
  { id: "demo_p4", title: '楽曲「夏の残像」',         category: "楽曲制作",        color: "#10b981", currentProgress: 30 },
  { id: "demo_p5", title: "コンセプトイラストシリーズ", category: "イラスト制作",   color: "#ec4899", currentProgress: 58 },
];

export const DEMO_HISTORIES: Record<string, HistoryEntry[]> = {
  demo_p1: [
    { date: daysAgo(95), progress: 5,  delta: 5, content: "ベースメッシュ作成。キャラクターの基本プロポーション確定" },
    { date: daysAgo(88), progress: 12, delta: 7, content: "胴体のポリゴン分割完了。密度を細かく調整した" },
    { date: daysAgo(82), progress: 19, delta: 7, content: "頭部の形状完成。耳の造形がとにかく大変だった" },
    { date: daysAgo(75), progress: 25, delta: 6, content: "手の指モデリング完了。指先の細かさにこだわった" },
    { date: daysAgo(70), progress: 30, delta: 5, content: "足のモデリング完了！全身の形が見えてきた" },
    { date: daysAgo(64), progress: 36, delta: 6, content: "服のモデリング開始。布のシワ表現を研究中" },
    { date: daysAgo(58), progress: 42, delta: 6, content: "服とベルト小物のモデリング完了" },
    { date: daysAgo(51), progress: 48, delta: 6, content: "UVアンラップ開始。思ったより複雑な構造" },
    { date: daysAgo(45), progress: 54, delta: 6, content: "全パーツのUVアンラップ完了。これが一番しんどかった" },
    { date: daysAgo(38), progress: 60, delta: 6, content: "テクスチャペイント開始。ベースカラー全体に塗布" },
    { date: daysAgo(32), progress: 64, delta: 4, content: "顔のテクスチャ完成！ようやく表情が出てきた" },
    { date: daysAgo(20), progress: 65, delta: 1, content: "スキニング調整。腕の動きをウェイトで修正" },
    { date: daysAgo(10), progress: 67, delta: 2, content: "下半身リギング完成。歩きモーションのテストOK" },
  ],
  demo_p2: [
    { date: daysAgo(60), progress: 5,  delta: 5, content: "デザインカンプ完成。グレー×ブルーのトーンに決定" },
    { date: daysAgo(55), progress: 10, delta: 5, content: "Next.js環境構築とデプロイ設定完了" },
    { date: daysAgo(50), progress: 15, delta: 5, content: "ヘッダー・ナビゲーションの実装完了" },
    { date: daysAgo(44), progress: 22, delta: 7, content: "About セクションのレイアウト完成" },
    { date: daysAgo(38), progress: 28, delta: 6, content: "Works ギャラリーのグリッドレイアウト実装" },
    { date: daysAgo(30), progress: 33, delta: 5, content: "スマホ・タブレット対応完了" },
    { date: daysAgo(22), progress: 38, delta: 5, content: "Framer Motionでスクロールアニメーション追加" },
    { date: daysAgo(15), progress: 42, delta: 4, content: "Contact フォームのUI完成" },
    { date: daysAgo(7),  progress: 45, delta: 3, content: "ダークモード対応完了。見た目がだいぶ良くなった" },
  ],
  demo_p3: [
    { date: daysAgo(120), progress: 8,  delta: 8, content: "世界の基本設定アウトライン完成。地理と歴史の骨格" },
    { date: daysAgo(112), progress: 15, delta: 7, content: "主要3カ国の政治体制と文化を記述" },
    { date: daysAgo(105), progress: 22, delta: 7, content: "主人公周辺のキャラクタープロフィール完成" },
    { date: daysAgo(98),  progress: 30, delta: 8, content: "魔法システムのルール体系を整理。7種類の属性魔法に決定" },
    { date: daysAgo(90),  progress: 38, delta: 8, content: "手描き地図の初稿完成。スキャンしてデジタル化" },
    { date: daysAgo(82),  progress: 45, delta: 7, content: "各地域の言語・方言の特徴を追加" },
    { date: daysAgo(75),  progress: 52, delta: 7, content: "年表完成。世界の歴史3000年分を記述" },
    { date: daysAgo(65),  progress: 60, delta: 8, content: "敵対勢力の組織構造と動機を詳細に記述" },
    { date: daysAgo(55),  progress: 67, delta: 7, content: "経済システム（通貨・貿易ルート）の設定完了" },
    { date: daysAgo(45),  progress: 72, delta: 5, content: "宗教と神話体系を追加。創世神話も書いた" },
    { date: daysAgo(33),  progress: 77, delta: 5, content: "各章プロットの概要メモ完成" },
    { date: daysAgo(18),  progress: 80, delta: 3, content: "キャラクター関係図を作成。思ったより複雑になった" },
    { date: daysAgo(8),   progress: 82, delta: 2, content: "序章の台詞・モノローグの草稿完成" },
  ],
  demo_p4: [
    { date: daysAgo(28), progress: 8,  delta: 8, content: "曲のコンセプトとキー決定。Cマイナー、テンポ92BPM" },
    { date: daysAgo(22), progress: 15, delta: 7, content: "メインメロディのデモ音源完成" },
    { date: daysAgo(17), progress: 20, delta: 5, content: "全セクションのコード進行確定" },
    { date: daysAgo(12), progress: 25, delta: 5, content: "ドラムパターン打ち込み完了。ブレイクの入れ方にこだわった" },
    { date: daysAgo(6),  progress: 28, delta: 3, content: "ベースラインを追加。グルーブ感が出てきた" },
    { date: daysAgo(2),  progress: 30, delta: 2, content: "ピアノアレンジの基本形が完成" },
  ],
  demo_p5: [
    { date: daysAgo(70), progress: 8,  delta: 8, content: "シリーズ全体のコンセプト決定。「時間と記憶」をテーマに3枚組" },
    { date: daysAgo(63), progress: 16, delta: 8, content: "1枚目「夜明け」ラフスケッチ完成" },
    { date: daysAgo(56), progress: 22, delta: 6, content: "1枚目の線画完成。細部の描き込みに時間がかかった" },
    { date: daysAgo(50), progress: 30, delta: 8, content: "1枚目のベースカラー全体に塗布完了" },
    { date: daysAgo(43), progress: 38, delta: 8, content: '1枚目「夜明け」完成！グラデーションが上手くいった' },
    { date: daysAgo(36), progress: 44, delta: 6, content: "2枚目「正午」のラフスケッチ完成" },
    { date: daysAgo(28), progress: 50, delta: 6, content: "2枚目の線画完成" },
    { date: daysAgo(20), progress: 55, delta: 5, content: "2枚目のベースカラー塗布完了" },
    { date: daysAgo(12), progress: 58, delta: 3, content: "2枚目の影入れ完了。立体感が出てきた" },
  ],
};

export function getLineChartData() {
  const dateSet = new Set<string>();
  Object.values(DEMO_HISTORIES).forEach((entries) =>
    entries.forEach((e) => dateSet.add(e.date))
  );
  const sorted = Array.from(dateSet).sort();

  return sorted.map((date) => {
    const point: Record<string, unknown> = { date };
    DEMO_PROJECTS.forEach((project) => {
      const entries = DEMO_HISTORIES[project.id];
      const prev = entries.filter((e) => e.date <= date);
      if (prev.length > 0) point[project.id] = prev[prev.length - 1].progress;
    });
    return point;
  });
}

export function getContributionData(): { date: string; count: number }[] {
  const result: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 363; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    let count = 0;
    Object.values(DEMO_HISTORIES).forEach((entries) => {
      count += entries.filter((e) => e.date === dateStr).length;
    });
    result.push({ date: dateStr, count });
  }
  return result;
}

export function getStreak(): number {
  const data = getContributionData();
  let streak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].count > 0) streak++;
    else break;
  }
  return streak;
}
