export interface LearningLogEntry {
  id: number;
  author?: string;
  title: string;
  description?: string;
  tags: string[];
  image?: string;
  likes: number;
  comments?: number;
  timestamp?: string;
}

export const learningLogs: LearningLogEntry[] = [
  {
    id: 3,
    author: "あなた",
    title: "ホームページ開設・Vercel公開",
    description: "本日、ホームページを開設しVercelへデプロイしました。既存プロジェクトの依存関係をクリーンにし、React + Viteの最小構成で再構築することで、デプロイフローを確立しました。",
    tags: ["React", "Git", "API"],
    image: "/hero-main.png",
    likes: 12,
    comments: 2,
    timestamp: "今日"
  }
];
