import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Upload } from "lucide-react";

const LANGUAGE_TAGS = ["HTML", "CSS", "JavaScript", "React", "API", "Git", "SEO", "Performance"];

export default function LearningLog() {
  const [logs, setLogs] = useState([
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
  ]);

  const [newLog, setNewLog] = useState({
    title: "",
    description: "",
    selectedTags: [] as string[]
  });

  const toggleTag = (tag: string) => {
    setNewLog(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const handleSubmit = () => {
    if (newLog.title && newLog.description) {
      setLogs([
        {
          id: logs.length + 1,
          author: "あなた",
          title: newLog.title,
          description: newLog.description,
          tags: newLog.selectedTags,
          image: "/training-dashboard.png",
          likes: 0,
          comments: 0,
          timestamp: "今"
        },
        ...logs
      ]);
      setNewLog({ title: "", description: "", selectedTags: [] });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/30 py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">学習ログ</h1>
          <p className="text-muted-foreground">挑戦の軌跡を共有しよう。Build in Public</p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container max-w-4xl">
          {/* Post Form */}
          <Card className="p-8 mb-12 border-border/30">
            <h2 className="text-2xl font-bold mb-6">新しい投稿</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">タイトル</label>
                <Input
                  placeholder="例: React Dashboard完成"
                  value={newLog.title}
                  onChange={(e) => setNewLog(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-card border-border/30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">説明</label>
                <textarea
                  placeholder="学習内容、工夫した点、困ったことなどを記述してください..."
                  value={newLog.description}
                  onChange={(e) => setNewLog(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 bg-card border border-border/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none h-32"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">使用した技術タグ</label>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGE_TAGS.map(tag => (
                    <Badge
                      key={tag}
                      variant={newLog.selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-2 border-dashed border-border/30 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">スクリーンショットをドラッグ&ドロップ</p>
              </div>

              <Button className="btn-primary w-full" onClick={handleSubmit}>
                投稿する
              </Button>
            </div>
          </Card>

          {/* Timeline */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">最新の投稿</h2>
            
            {logs.map(log => (
              <Card key={log.id} className="overflow-hidden border-border/30 hover:border-accent/50 transition-all">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{log.author} • {log.timestamp}</p>
                      <h3 className="text-xl font-bold">{log.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{log.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {log.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                      <button className="flex items-center gap-2 hover:text-accent transition">
                        <Heart className="h-4 w-4" />
                        {log.likes}
                      </button>
                      <button className="flex items-center gap-2 hover:text-accent transition">
                        <MessageCircle className="h-4 w-4" />
                        {log.comments}
                      </button>
                      <button className="flex items-center gap-2 hover:text-accent transition">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg overflow-hidden">
                    <img src={log.image} alt={log.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
