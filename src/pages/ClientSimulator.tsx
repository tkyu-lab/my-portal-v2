import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

type Scenario = "scopeCreep" | "paymentDelay" | "specChange" | null;
type ResponseChoice = string | null;

interface ScenarioResult {
  score: number;
  feedback: string;
  bestPractice: string;
  lessonPoints: string[];
}

const SCENARIOS = {
  scopeCreep: {
    title: "スコープクリープ: 機能要件の段階的追加",
    description: "契約後、クライアントから次々と新しい機能要望が出ています。",
    situation: `
      契約内容: 企業サイトのリニューアル（5ページ、基本的なCMS機能）
      納期: 6週間
      予算: ¥600,000
      
      現在の進捗: 3週間経過、デザインと基本実装が完了
      
      クライアントからのメール:
      「いい感じですね！ところで、以下の機能も追加できませんか？
      - 多言語対応（英語、中国語）
      - 会員登録・ログイン機能
      - ブログシステムの拡張
      - SNS連携
      
      納期は変わらずで大丈夫ですよね？」
    `,
    choices: [
      {
        text: "「かしこまりました。納期内に対応します」と即座に承諾する",
        score: 20,
        feedback: "❌ 危険です。スコープ追加で納期超過・品質低下のリスク大。",
        bestPractice: "スコープ追加は必ず見積もり・納期変更の相談を。"
      },
      {
        text: "「それぞれの機能について見積もりを提示し、追加料金と納期延長を提案する」",
        score: 95,
        feedback: "✅ 正解です。プロフェッショナルな対応。",
        bestPractice: "スコープ追加は新規案件として扱い、明確に見積もる。"
      },
      {
        text: "「すべての機能は対応できませんが、優先順位をつけて一部対応します」と交渉する",
        score: 70,
        feedback: "△ 部分的に正解。ただし、見積もり提示がないと後で問題に。",
        bestPractice: "部分対応でも、追加料金と納期変更は明示する。"
      }
    ]
  },
  paymentDelay: {
    title: "支払い遅延: クライアントからの支払いが遅れている",
    description: "納品から2週間、支払期限を過ぎても入金がありません。",
    situation: `
      契約内容: ECサイト構築
      納期: 2024年12月15日（完了）
      支払期限: 2025年1月15日
      請求額: ¥1,200,000
      
      現在の状況: 2025年1月20日、まだ入金なし
      
      クライアントからのメール:
      「お疲れ様です。サイトの動作確認をしていたところ、
      いくつか不具合が見つかったので、修正してから支払います。
      修正は無料でお願いします。」
      
      ※ 契約書では「納品後の軽微な修正は無料」と記載
    `,
    choices: [
      {
        text: "「不具合の修正は無料で対応します」と承諾し、修正後に支払いを待つ",
        score: 30,
        feedback: "❌ 支払い遅延の言い訳に使われる可能性。修正内容を確認すべき。",
        bestPractice: "不具合の内容を確認し、軽微か重大かを判断する。"
      },
      {
        text: "「不具合の詳細を確認してから対応を判断します。また、支払期限を過ぎているため、先に請求額の50%をお支払いください」と提案する",
        score: 85,
        feedback: "✅ 良い対応。支払いと修正を分離し、キャッシュフローを守る。",
        bestPractice: "支払いと修正は別問題。期限内の支払いは契約義務。"
      },
      {
        text: "「契約書に軽微な修正は無料と書いてあるので、修正してから支払ってください」と強く要求する",
        score: 50,
        feedback: "△ 正当性はあるが、クライアント関係が悪化する可能性。",
        bestPractice: "法的に正しくても、ビジネス関係を考慮した対応を。"
      }
    ]
  },
  specChange: {
    title: "仕様変更: 納品後に大幅な仕様変更を要求される",
    description: "納品したサイトについて、クライアントから大幅な変更要求が来ました。",
    situation: `
      契約内容: ポートフォリオサイト構築
      納期: 2025年1月10日（完了）
      請求額: ¥300,000
      支払期限: 2025年1月31日
      
      現在の状況: 納品から1週間
      
      クライアントからのメール:
      「サイトを見ていたら、デザインがイメージと違いました。
      以下の変更をお願いします：
      - カラースキームの全面変更
      - レイアウトの大幅変更
      - 画像素材の全て差し替え
      - アニメーション効果の追加
      
      これくらいは修正範囲ですよね？」
      
      ※ 納品前に3回のデザイン確認があり、クライアントが承認済み
    `,
    choices: [
      {
        text: "「デザイン確認時に承認いただいたので、大幅な変更は追加料金が必要です」と提示する",
        score: 90,
        feedback: "✅ 最適な対応。契約と承認履歴を根拠に説明。",
        bestPractice: "承認プロセスを記録し、その後の変更は追加料金化する。"
      },
      {
        text: "「修正対応しますが、追加料金は¥150,000です」と見積もりを提示する",
        score: 85,
        feedback: "✅ 良い対応。ただし、契約書の確認が重要。",
        bestPractice: "変更内容を明確にして、見積もりを提示する。"
      },
      {
        text: "「すべての変更に対応します」と承諾する",
        score: 20,
        feedback: "❌ 危険です。無限の修正要求に応じることになる可能性。",
        bestPractice: "納品後の大幅変更は新規案件として扱う。"
      }
    ]
  }
};

export default function ClientSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(null);
  const [selectedChoice, setSelectedChoice] = useState<ResponseChoice>(null);
  const [showResult, setShowResult] = useState(false);

  const scenarioData = selectedScenario ? (SCENARIOS as Record<string, any>)[selectedScenario] : null;

  const handleScenarioSelect = (key: Scenario | null) => {
    setSelectedScenario(key);
    setSelectedChoice(null);
    setShowResult(false);
  };

  const handleChoiceSelect = (choice: string | null) => {
    setSelectedChoice(choice);
  };

  const handleSubmit = () => {
    if (selectedChoice && scenarioData) {
      const choiceData = scenarioData.choices.find((c: any) => c.text === selectedChoice);
      setShowResult(true);
    }
  };

  const getResult = (): ScenarioResult | null => {
    if (!selectedChoice || !scenarioData) return null;
    const choiceData = scenarioData.choices.find((c: any) => c.text === selectedChoice);
    if (!choiceData) return null;

    const lessonPoints = [
      "クライアント関係を長期的に構築する",
      "契約書と見積もりを明確にする",
      "スコープ管理の重要性を理解する",
      "キャッシュフロー管理を徹底する",
      "変更要求は新規案件として扱う"
    ];

    return {
      score: choiceData.score,
      feedback: choiceData.feedback,
      bestPractice: choiceData.bestPractice,
      lessonPoints: lessonPoints.slice(0, 3)
    };
  };

  const result = getResult();

  if (!selectedScenario) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="border-b border-border/30 py-8">
          <div className="container">
            <h1 className="text-4xl font-bold mb-2">クライアント対応シミュレーター</h1>
            <p className="text-muted-foreground">フリーランスが直面する3つの典型的なトラブルシナリオで、実践的な対応スキルを磨く</p>
          </div>
        </div>

        <div className="section-padding">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(SCENARIOS).map(([key, scenario]) => (
                <Card
                  key={key}
                  className="p-6 border-border/30 hover:border-accent/50 transition-all cursor-pointer"
                  onClick={() => handleScenarioSelect(key as Scenario)}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <h3 className="font-bold text-lg">{scenario.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{scenario.description}</p>
                  <Button className="btn-primary w-full">シナリオを開始</Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border/30 py-8">
        <div className="container">
          <button
            onClick={() => handleScenarioSelect(null)}
            className="text-accent hover:text-accent/80 transition mb-4"
          >
            ← シナリオ選択に戻る
          </button>
          <h1 className="text-4xl font-bold">{scenarioData?.title}</h1>
        </div>
      </div>

      <div className="section-padding">
        <div className="container max-w-4xl">
          {!showResult ? (
            <div className="space-y-8">
              {/* Situation */}
              <Card className="p-8 border-border/30 bg-card/50">
                <h2 className="text-2xl font-bold mb-4">状況説明</h2>
                <div className="bg-background p-6 rounded-lg border border-border/30 whitespace-pre-wrap text-sm font-mono text-muted-foreground">
                  {scenarioData?.situation}
                </div>
              </Card>

              {/* Choices */}
              <Card className="p-8 border-border/30">
                <h2 className="text-2xl font-bold mb-6">あなたの対応を選択してください</h2>
                <div className="space-y-4">
                  {scenarioData?.choices.map((choice: any, idx: number) => (
                    <div
                      key={idx}
                      onClick={() => handleChoiceSelect(choice.text)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedChoice === choice.text
                          ? "border-accent bg-accent/10"
                          : "border-border/30 hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 mt-1 flex-shrink-0 ${
                          selectedChoice === choice.text
                            ? "border-accent bg-accent"
                            : "border-border/30"
                        }`} />
                        <p className="text-foreground font-medium">{choice.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  className="btn-primary w-full mt-8"
                  onClick={handleSubmit}
                  disabled={!selectedChoice}
                >
                  回答を確認
                </Button>
              </Card>
            </div>
          ) : result ? (
            <div className="space-y-8">
              {/* Result */}
              <Card className={`p-8 border-2 ${
                result.score >= 80
                  ? "border-green-500/50 bg-green-500/10"
                  : result.score >= 60
                  ? "border-yellow-500/50 bg-yellow-500/10"
                  : "border-red-500/50 bg-red-500/10"
              }`}>
                <div className="flex items-start gap-4 mb-6">
                  {result.score >= 80 ? (
                    <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0" />
                  ) : result.score >= 60 ? (
                    <AlertCircle className="h-8 w-8 text-yellow-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-2">スコア: {result.score}/100</h2>
                    <p className="text-lg">{result.feedback}</p>
                  </div>
                </div>
              </Card>

              {/* Best Practice */}
              <Card className="p-8 border-border/30 bg-accent/5">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  ベストプラクティス
                </h3>
                <p className="text-lg text-foreground mb-4">{result.bestPractice}</p>
              </Card>

              {/* Learning Points */}
              <Card className="p-8 border-border/30">
                <h3 className="text-xl font-bold mb-4">学習ポイント</h3>
                <div className="space-y-3">
                  {result.lessonPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Badge className="mt-1 flex-shrink-0">Tip {idx + 1}</Badge>
                      <p className="text-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button
                  className="btn-primary flex-1"
                  onClick={() => handleScenarioSelect(null)}
                >
                  別のシナリオに挑戦
                </Button>
                <Button
                  className="btn-secondary flex-1"
                  onClick={() => {
                    setSelectedChoice(null);
                    setShowResult(false);
                  }}
                >
                  このシナリオをやり直す
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
