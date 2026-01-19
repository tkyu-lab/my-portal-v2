//import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, Zap, BookOpen, CheckCircle2, Trophy, AlertTriangle } from "lucide-react";
//import { getLoginUrl } from "@/const";

export default function Home() {
  const isAuthenticated = true;//ここを書き換え

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border/30 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <div className="text-2xl font-bold accent-text">AI-to-Manual</div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button variant="outline" size="sm">Dashboard</Button>
            ) : (
              <Button className="btn-primary" size="sm" onClick={() => window.location.href = getLoginUrl()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    AIを指揮し、<span className="accent-text">コードを操る</span>。
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Web制作の未来を、あなたの手に。
                  </p>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Manus AIによる爆速構築から、HTML/CSS/JSによる至高の磨き上げまで。学習過程を資産に変えるプラットフォーム。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button className="btn-primary" size="lg" onClick={() => window.location.href = '/training'}>
                    今すぐ始める <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button className="btn-secondary" size="lg" onClick={() => window.location.href = '/client-simulator'}>
                    デモを見る
                  </Button>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden border border-border/30 card-shadow">
                <img
                  src="/hero-main.png"
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Learning Roadmap Section */}
        <section className="section-padding bg-card/50 border-y border-border/30">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">プロへの3ステップ</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AIが土台を作り、あなたが命を吹き込む。
              </p>
            </div>

            <div className="mb-12">
              <img
                src="/roadmap-infographic.png"
                alt="Learning Roadmap"
                className="w-full rounded-lg card-shadow"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Foundation",
                  desc: "Manusを利用し、自然言語プロンプトからフルスタックのサイトを数分で生成する方法を習得。",
                  icon: Zap
                },
                {
                  title: "The Refinement Layer",
                  desc: "エクスポートしたコードをGitHubへ同期し、セマンティックHTMLへの修正やレイアウト安定化を学ぶ。",
                  icon: Code2
                },
                {
                  title: "Interactive Logic",
                  desc: "JavaScriptによるDOM操作や、Stripe、Google Mapsなどの外部API連携を学ぶ。",
                  icon: BookOpen
                }
              ].map((step, idx) => {
                const Icon = step.icon;
                return (
                  <Card key={idx} className="p-8 bg-background border-border/30 hover:border-accent/50 transition-all">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-accent/10 rounded-lg">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <span className="text-sm font-semibold text-accent">Step {idx + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Training Section */}
        <section className="section-padding">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  あなたの限界に<span className="accent-text">AIが挑む</span>。
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  習熟度に応じたカスタム・チャレンジで、確実なスキルアップを実現します。
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    { level: "初級", desc: "基本的なHTMLタグと変数の穴埋め" },
                    { level: "中級", desc: "ループ処理とFlexboxの配置修正" },
                    { level: "上級", desc: "非同期処理とAPI連携のデバッグ" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">{item.level}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden border border-border/30 card-shadow">
                <img
                  src="/training-dashboard.png"
                  alt="Training Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Learning Log Section */}
        <section className="section-padding bg-card/50 border-y border-border/30">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">挑戦の軌跡が、ポートフォリオになる</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Build in Public: 学習過程を共有し、コミュニティから学ぶ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "ホームページ開設・Vercel公開", tags: ["React", "Git", "API"], likes: 12 },
                { title: "React Dashboard完成", tags: ["React", "CSS", "API"], likes: 42 },
                { title: "HTMLセマンティック化", tags: ["HTML", "SEO"], likes: 28 }
              ].map((log, idx) => (
                <Card
                  key={idx}
                  className="overflow-hidden border-border/30 hover:border-accent/50 transition-all cursor-pointer"
                  onClick={() => window.location.href = '/learning-log'}
                >
                  <div className="h-40 bg-gradient-to-br from-accent/20 to-accent/5"></div>
                  <div className="p-6 space-y-4">
                    <h3 className="font-bold text-lg">{log.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {log.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Trophy className="h-4 w-4 text-accent" />
                      {log.likes} いいね
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Forum Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">答えではなく、導きを</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                ソクラテス式メンター: AIがヒントを与え、仲間が解決を助ける
              </p>
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                { q: "FlexboxとGridの使い分けは?", resolved: true, replies: 5 },
                { q: "非同期処理でエラーが出ます", resolved: false, replies: 3 },
                { q: "APIレスポンスの型定義方法", resolved: true, replies: 8 }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 border-border/30 hover:border-accent/50 transition-all flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
                    <p className="text-sm text-muted-foreground">{item.replies} 件の回答</p>
                  </div>
                  {item.resolved && (
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Maintenance Section */}
        <section className="section-padding bg-card/50 border-y border-border/30">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  納品はスタートに過ぎない
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  継続的な信頼を築く運用スキルを磨く。デイリー・ウィークリー・マンスリーの保守タスク管理。
                </p>
                <div className="space-y-3 pt-4">
                  {[
                    "SEOの最適化（Lighthouse、Schema.org）",
                    "セキュリティパッチの適用",
                    "バックアップ管理の習慣化",
                    "パフォーマンス監視"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden border border-border/30 card-shadow">
                <img
                  src="/maintenance-module.png"
                  alt="Maintenance"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Client Simulator Section */}
        <section className="section-padding bg-card/50 border-y border-border/30">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">実践的なトラブル対応スキル</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                クライアント対応シミュレーター: フリーランスが直面する3つの典型的なトラブルシナリオ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "スコープクリープ",
                  desc: "契約後に機能要件が次々と追加される状況で、適切に対応する方法を学ぶ",
                  icon: AlertTriangle
                },
                {
                  title: "支払い遅延",
                  desc: "支払期限を過ぎても入金がない場合の、キャッシュフロー管理と対応方法",
                  icon: AlertTriangle
                },
                {
                  title: "仕様変更",
                  desc: "納品後の大幅な仕様変更要求に対し、契約と見積もりで対応する方法",
                  icon: AlertTriangle
                }
              ].map((scenario, idx) => {
                const Icon = scenario.icon;
                return (
                  <Card key={idx} className="p-6 border-border/30 hover:border-accent/50 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-accent/10 rounded-lg">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="font-bold text-lg">{scenario.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{scenario.desc}</p>
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Button className="btn-primary" size="lg" onClick={() => window.location.href = '/client-simulator'}>
                シミュレーターに挑戦 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="section-padding">
          <div className="container">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">マイルストーン達成で学習を加速</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                習熟度バッジとゲーミフィケーション
              </p>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden border border-border/30 card-shadow">
              <img
                src="/badges-collection.png"
                alt="Badges"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-accent/10 to-accent/5 border-y border-border/30">
          <div className="container text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              今、プロの道を歩み始めよう
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              AIとコードの力を手に入れれば、あなたのキャリアは無限の可能性に満ちています。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="btn-primary" size="lg">
                無料で始める
              </Button>
              <Button className="btn-secondary" size="lg">
                詳細を見る
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/50 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">プロダクト</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">機能</a></li>
                <li><a href="#" className="hover:text-accent transition">価格</a></li>
                <li><a href="#" className="hover:text-accent transition">ブログ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">コミュニティ</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">フォーラム</a></li>
                <li><a href="#" className="hover:text-accent transition">Discord</a></li>
                <li><a href="#" className="hover:text-accent transition">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">リソース</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">ドキュメント</a></li>
                <li><a href="#" className="hover:text-accent transition">チュートリアル</a></li>
                <li><a href="#" className="hover:text-accent transition">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">法務</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">プライバシー</a></li>
                <li><a href="#" className="hover:text-accent transition">利用規約</a></li>
                <li><a href="#" className="hover:text-accent transition">お問い合わせ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2026 AI-to-Manual. All rights reserved.</p>
            <p className="text-sm text-muted-foreground">Powered by Manus</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
