import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, MessageCircle, CheckCircle2, Search } from "lucide-react";

export default function Forum() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "FlexboxとGridの使い分けは?",
      author: "田中太郎",
      category: "CSS/レイアウト",
      views: 234,
      replies: 5,
      resolved: true,
      timestamp: "2日前",
      aiHintProvided: true
    },
    {
      id: 2,
      title: "非同期処理でエラーが出ます",
      author: "鈴木花子",
      category: "JavaScript",
      views: 89,
      replies: 3,
      resolved: false,
      timestamp: "5時間前",
      aiHintProvided: true
    },
    {
      id: 3,
      title: "APIレスポンスの型定義方法",
      author: "佐藤次郎",
      category: "API連携",
      views: 156,
      replies: 8,
      resolved: true,
      timestamp: "1日前",
      aiHintProvided: true
    },
    {
      id: 4,
      title: "Stripe決済の実装手順",
      author: "山田太郎",
      category: "API連携",
      views: 45,
      replies: 2,
      resolved: false,
      timestamp: "3時間前",
      aiHintProvided: false
    }
  ]);

  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    category: "HTML/セマンティック"
  });

  const [showForm, setShowForm] = useState(false);

  const categories = [
    "HTML/セマンティック",
    "CSS/レイアウト",
    "JavaScript/DOM操作",
    "API連携",
    "デプロイ/運用",
    "パフォーマンス",
    "セキュリティ"
  ];

  const handleSubmit = () => {
    if (newQuestion.title && newQuestion.description) {
      setQuestions([
        {
          id: questions.length + 1,
          title: newQuestion.title,
          author: "あなた",
          category: newQuestion.category,
          views: 0,
          replies: 0,
          resolved: false,
          timestamp: "今",
          aiHintProvided: true
        },
        ...questions
      ]);
      setNewQuestion({ title: "", description: "", category: "HTML/セマンティック" });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/30 py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">質問フォーラム</h1>
          <p className="text-muted-foreground">答えではなく、導きを。AIがヒントを与え、仲間が解決を助ける。</p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container max-w-4xl">
          {/* Search and New Question */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="質問を検索..."
                className="pl-10 bg-card border-border/30"
              />
            </div>
            <Button className="btn-primary" onClick={() => setShowForm(true)}>
              質問を投稿
            </Button>
          </div>

          {/* New Question Form */}
          {showForm && (
            <Card className="p-8 mb-12 border-border/30">
              <h2 className="text-2xl font-bold mb-6">新しい質問</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">タイトル</label>
                  <Input
                    placeholder="質問のタイトルを入力してください"
                    value={newQuestion.title}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-card border-border/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">詳細説明</label>
                  <textarea
                    placeholder="問題の詳細、試したこと、エラーメッセージなどを記述してください..."
                    value={newQuestion.description}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 bg-card border border-border/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">カテゴリ</label>
                  <select
                    value={newQuestion.category}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 bg-card border border-border/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button className="btn-primary flex-1" onClick={handleSubmit}>
                    質問を投稿
                  </Button>
                  <Button className="btn-secondary flex-1" onClick={() => setShowForm(false)}>
                    キャンセル
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">最新の質問</h2>
            
            {questions.map(q => (
              <Card key={q.id} className="p-6 border-border/30 hover:border-accent/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      {q.resolved && (
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold hover:text-accent transition">{q.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {q.author} • {q.timestamp}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">{q.category}</Badge>
                      {q.aiHintProvided && (
                        <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30">
                          AIヒント提供済み
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {q.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {q.replies}
                    </div>
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
