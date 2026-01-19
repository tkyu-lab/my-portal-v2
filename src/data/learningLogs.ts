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
    },
    {
        id: 1,
        author: "田中太郎",
        title: "React Dashboard完成",
        description: "Tailwind CSSを使ってダッシュボードを完成させました。レスポンシブデザイン対応済み。",
        tags: ["React", "CSS", "JavaScript"],
        image: "/badges-collection.png",
        likes: 42,
        comments: 8,
        timestamp: "2日前"
    },
    {
        id: 2,
        author: "鈴木花子",
        title: "HTMLセマンティック化",
        description: "既存のdivベースのコードをセマンティックHTMLに改善。SEOスコアが向上しました。",
        tags: ["HTML", "SEO"],
        image: "/roadmap-infographic.png",
        likes: 28,
        comments: 5,
        timestamp: "5日前"
    }
];
