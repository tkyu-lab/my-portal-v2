import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Target, Flame, Award } from "lucide-react";

export default function Training() {
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = {
    beginner: [
      {
        id: 1,
        title: "HTMLの基本タグ",
        description: "以下の空白に適切なHTMLタグを入力してください。",
        code: "<___>\n  <title>My Page</title>\n</___>",
        hint: "ページ全体を囲むタグです",
        answer: "html"
      },
      {
        id: 2,
        title: "CSSの基本プロパティ",
        description: "テキストの色を赤にするCSSプロパティは?",
        code: "p { ___ : red; }",
        hint: "colorプロパティを使います",
        answer: "color"
      }
    ],
    intermediate: [
      {
        id: 1,
        title: "Flexboxレイアウト",
        description: "3つのボックスを横並びにするFlexboxの設定は?",
        code: ".container { display: ___; }",
        hint: "flex値を使用します",
        answer: "flex"
      },
      {
        id: 2,
        title: "JavaScriptループ",
        description: "1から10まで出力するループを完成させてください",
        code: "for (let i = ___; i <= 10; i++) { console.log(i); }",
        hint: "iを1から開始します",
        answer: "1"
      }
    ],
    advanced: [
      {
        id: 1,
        title: "非同期処理",
        description: "APIレスポンスを正しく処理するコードは?",
        code: "const data = ___ fetch(url).then(r => r.json());",
        hint: "awaitキーワードを使用します",
        answer: "await"
      },
      {
        id: 2,
        title: "状態管理",
        description: "Reactで状態を管理するフックは?",
        code: "const [count, setCount] = ___('useState', 0);",
        hint: "useStateフックを使用します",
        answer: "useState"
      }
    ]
  };

  const stats = {
    completed: 47,
    streak: 12,
    masteryScore: 72,
    beginner: 30,
    intermediate: 50,
    advanced: 20
  };

  const currentQuestions = questions[difficulty];
  const question = currentQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border/30 py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">AI適応型トレーニング</h1>
          <p className="text-muted-foreground">あなたの限界にAIが挑む。習熟度に応じたカスタム・チャレンジ。</p>
        </div>
      </div>

      <div className="section-padding">
        <div className="container">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: "完了した問題", value: stats.completed, icon: Target },
              { label: "連続学習日数", value: `${stats.streak}日`, icon: Flame },
              { label: "マスタリースコア", value: `${stats.masteryScore}%`, icon: Award },
              { label: "習熟度レベル", value: "中級", icon: Zap }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx} className="p-6 border-border/30 text-center">
                  <Icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </Card>
              );
            })}
          </div>

          {/* Proficiency Overview */}
          <Card className="p-8 mb-12 border-border/30">
            <h2 className="text-2xl font-bold mb-6">習熟度の分布</h2>
            <div className="space-y-6">
              {[
                { level: "初級", percentage: stats.beginner, color: "bg-blue-500" },
                { level: "中級", percentage: stats.intermediate, color: "bg-accent" },
                { level: "上級", percentage: stats.advanced, color: "bg-purple-500" }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{item.level}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Difficulty Selection */}
          <div className="mb-8 flex gap-3">
            {(["beginner", "intermediate", "advanced"] as const).map(level => (
              <Button
                key={level}
                variant={difficulty === level ? "default" : "outline"}
                onClick={() => { setDifficulty(level); setCurrentQuestion(0); }}
                className={difficulty === level ? "btn-primary" : "btn-secondary"}
              >
                {level === "beginner" && "初級"}
                {level === "intermediate" && "中級"}
                {level === "advanced" && "上級"}
              </Button>
            ))}
          </div>

          {/* Question Card */}
          <Card className="p-8 border-border/30 mb-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{question.title}</h2>
                <Badge variant="outline">{currentQuestion + 1} / {currentQuestions.length}</Badge>
              </div>
              <Progress value={(currentQuestion + 1) / currentQuestions.length * 100} className="h-2" />
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">{question.description}</p>

              <div className="bg-card p-6 rounded-lg border border-border/30 font-mono text-sm">
                <pre className="text-accent whitespace-pre-wrap">{question.code}</pre>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                <p className="text-sm"><span className="font-semibold">ヒント:</span> {question.hint}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">回答</label>
                <input
                  type="text"
                  placeholder="答えを入力してください"
                  className="w-full p-3 bg-card border border-border/30 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <div className="flex gap-4">
                <Button className="btn-primary flex-1">
                  回答を確認
                </Button>
                <Button className="btn-secondary flex-1">
                  スキップ
                </Button>
              </div>
            </div>
          </Card>

          {/* Recommended Next */}
          <Card className="p-6 border-border/30">
            <h3 className="font-bold mb-4">次に解くべき問題</h3>
            <p className="text-muted-foreground">あなたの習熟度に基づいて、次の問題が推奨されています。</p>
            <Button className="btn-primary mt-4">推奨問題を開始</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
