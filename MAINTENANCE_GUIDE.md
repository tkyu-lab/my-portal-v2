# AI-to-Manual プラットフォーム - 更新・保守ガイド

**最終更新日**: 2026年1月15日  
**バージョン**: 1.0  
**対象者**: プロジェクトオーナー、開発者、運用チーム

---

## 📋 目次

1. [プラットフォーム概要](#プラットフォーム概要)
2. [システム構成](#システム構成)
3. [日次保守タスク](#日次保守タスク)
4. [週次保守タスク](#週次保守タスク)
5. [月次保守タスク](#月次保守タスク)
6. [機能追加・更新手順](#機能追加更新手順)
7. [トラブルシューティング](#トラブルシューティング)
8. [バックアップ・復旧](#バックアップ復旧)
9. [セキュリティ管理](#セキュリティ管理)
10. [パフォーマンス最適化](#パフォーマンス最適化)

---

## プラットフォーム概要

### 概要

AI-to-Manualは、初心者からプロレベルまでのWeb開発スキルを段階的に習得できるAI学習プラットフォームです。Manusで生成したコードを手動で磨き上げるプロセスを通じて、自立した開発者を育成します。

### 主要機能

| 機能 | 説明 | 重要度 |
|------|------|--------|
| ホームページ | コンセプト紹介、ロードマップ表示 | 高 |
| 学習ログ（Build in Public） | ユーザーが進捗を投稿・共有 | 高 |
| AI適応型トレーニング | 習熟度別の問題生成と進捗管理 | 高 |
| 質問フォーラム | ソクラテス式メンター、AIヒント生成 | 中 |
| 習熟度バッジ | マイルストーン達成時のバッジ付与 | 中 |
| 運用・保守モジュール | SEO、セキュリティ、バックアップ管理 | 中 |
| GitHub同期ダッシュボード | コード同期と修正履歴の可視化 | 中 |
| クライアント対応シミュレーター | トラブルシナリオの対話型学習 | 低 |

---

## システム構成

### 技術スタック

```
フロントエンド:
  - React 19
  - Tailwind CSS 4
  - shadcn/ui コンポーネント
  - Vite（ビルドツール）

バックエンド:
  - Express 4
  - tRPC 11（型安全なAPI）
  - Drizzle ORM（データベース操作）

データベース:
  - MySQL/TiDB

認証:
  - Manus OAuth

AI連携:
  - LLM統合（問題生成、ヒント生成）
```

### ディレクトリ構成

```
ai-to-manual-platform/
├── client/                    # フロントエンド
│   ├── src/
│   │   ├── pages/            # ページコンポーネント
│   │   ├── components/       # 再利用可能なUI
│   │   ├── contexts/         # React Context
│   │   ├── hooks/            # カスタムフック
│   │   ├── lib/              # ユーティリティ
│   │   ├── App.tsx           # ルーティング
│   │   └── index.css         # グローバルスタイル
│   ├── public/               # 静的アセット
│   └── index.html
├── server/                    # バックエンド
│   ├── routers.ts            # tRPCルーター
│   ├── db.ts                 # データベースヘルパー
│   ├── storage.ts            # S3ストレージ
│   └── _core/                # フレームワーク
├── drizzle/                   # データベーススキーマ
│   └── schema.ts
├── shared/                    # 共有定数・型
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 日次保守タスク

### 1. サイト動作確認（毎日朝）

**目的**: サイトが正常に動作しているか確認

**手順**:

1. Management UIの「Dashboard」パネルを開く
2. 以下の項目を確認：
   - ✅ Dev Serverが「running」状態か
   - ✅ エラーログが表示されていないか
   - ✅ ホームページが正常に表示されるか

**確認項目**:

```bash
# ターミナルでの確認方法
curl -s https://your-domain.manus.space/ | grep -q "AI-to-Manual" && echo "OK" || echo "NG"
```

### 2. ユーザーアクティビティ確認

**目的**: ユーザーの活動状況を把握

**確認内容**:

- 新規学習ログ投稿数
- フォーラム質問数
- トレーニング完了数
- エラー報告の有無

**データベースクエリ例**:

```sql
-- 本日の新規投稿数
SELECT COUNT(*) FROM learning_logs 
WHERE DATE(createdAt) = CURDATE();

-- 本日の質問数
SELECT COUNT(*) FROM forum_questions 
WHERE DATE(createdAt) = CURDATE();
```

### 3. エラーログ確認

**目的**: エラーが発生していないか確認

**確認方法**:

1. Management UIの「Dashboard」でエラーログを確認
2. ブラウザの開発者ツール（F12）でコンソールエラーを確認
3. サーバーログで500エラーがないか確認

**ログ確認コマンド**:

```bash
# サーバーログの最新100行を表示
tail -100 /var/log/ai-to-manual/server.log

# エラーのみを抽出
grep ERROR /var/log/ai-to-manual/server.log | tail -20
```

---

## 週次保守タスク

### 1. バックアップ確認（毎週月曜日）

**目的**: データが正常にバックアップされているか確認

**手順**:

1. Management UIの「Database」パネルを開く
2. バックアップ状態を確認
3. 最新バックアップの日時を記録

**バックアップ内容**:

- データベース全体
- ユーザーデータ
- 学習ログ
- フォーラム投稿
- バッジ情報

### 2. パフォーマンス監視（毎週水曜日）

**目的**: サイトの速度が低下していないか確認

**確認項目**:

| 項目 | 目標値 | 確認方法 |
|------|--------|---------|
| ページ読み込み時間 | < 2秒 | Lighthouse |
| API応答時間 | < 500ms | ブラウザ開発者ツール |
| データベースクエリ | < 100ms | サーバーログ |

**Lighthouse実行方法**:

1. ホームページを開く
2. ブラウザ開発者ツール（F12）を開く
3. 「Lighthouse」タブをクリック
4. 「Analyze page load」をクリック

**目標スコア**:

- Performance: 90以上
- Accessibility: 95以上
- Best Practices: 95以上
- SEO: 95以上

### 3. セキュリティパッチ確認（毎週金曜日）

**目的**: 依存ライブラリのセキュリティ脆弱性を確認

**手順**:

```bash
# 脆弱性をチェック
pnpm audit

# 脆弱性がある場合は修正
pnpm audit --fix

# 修正内容をコミット
git add package.json pnpm-lock.yaml
git commit -m "chore: security patch"
```

**重要度の判定**:

| 重要度 | 対応期限 | 対応方法 |
|--------|---------|---------|
| Critical | 即日 | 緊急パッチ適用 |
| High | 1週間以内 | 次回更新時に適用 |
| Medium | 1ヶ月以内 | 月次更新に含める |
| Low | 3ヶ月以内 | 定期更新に含める |

### 4. ユーザーフィードバック確認

**目的**: ユーザーからの要望・問題報告を確認

**確認内容**:

- 問題報告の有無
- 機能リクエスト
- UIの改善提案
- バグ報告

---

## 月次保守タスク

### 1. SEO最適化（毎月1日）

**目的**: 検索エンジンでの表示順位を維持・向上

**確認項目**:

```
□ メタディスクリプション（160文字以内）
□ OGP画像の設定
□ サイトマップの更新
□ robots.txtの確認
□ 構造化データ（Schema.org）の検証
□ 内部リンク構造の確認
```

**実行手順**:

```bash
# サイトマップを生成
npm run generate-sitemap

# SEO監査ツールで確認
# https://www.seobility.net/ または Google Search Console
```

**Google Search Consoleでの確認**:

1. Google Search Consoleにログイン
2. 「カバレッジ」でエラーを確認
3. 「パフォーマンス」でクリック数・表示回数を確認
4. 「検査」でページインデックス状態を確認

### 2. コンテンツ更新（毎月中旬）

**目的**: 最新情報を反映し、ユーザーの満足度を維持

**更新対象**:

| コンテンツ | 更新頻度 | 確認項目 |
|-----------|---------|---------|
| ホームページ | 月1回 | 情報の正確性、リンク切れ |
| ブログ記事 | 週1回 | 情報の鮮度、画像の表示 |
| FAQ | 月1回 | 新しい質問への対応 |
| チュートリアル | 四半期1回 | 最新技術への対応 |

**更新手順**:

```bash
# ファイルを編集
# client/src/pages/Home.tsx など

# 変更をテスト
pnpm dev

# ビルドして本番環境に反映
pnpm build
```

### 3. ユーザーデータ分析（毎月末）

**目的**: ユーザー行動を分析し、改善に活かす

**分析項目**:

```sql
-- 月間アクティブユーザー数
SELECT COUNT(DISTINCT userId) as MAU
FROM user_activities
WHERE DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- 学習ログ投稿数の推移
SELECT DATE(createdAt) as date, COUNT(*) as count
FROM learning_logs
WHERE DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY DATE(createdAt)
ORDER BY date;

-- トレーニング完了率
SELECT 
  difficulty,
  COUNT(*) as total,
  SUM(CASE WHEN completed = true THEN 1 ELSE 0 END) as completed,
  ROUND(SUM(CASE WHEN completed = true THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) as completion_rate
FROM training_progress
WHERE DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY difficulty;
```

**レポート項目**:

- 新規ユーザー数
- 既存ユーザーのリテンション率
- 学習ログ投稿数
- フォーラム活動度
- トレーニング完了率
- バッジ取得数

### 4. 依存ライブラリの更新確認（毎月末）

**目的**: 最新の安定版ライブラリを使用

**手順**:

```bash
# 更新可能なパッケージを確認
pnpm outdated

# マイナーバージョンアップデート（安全）
pnpm update

# メジャーバージョンアップデート（要テスト）
pnpm add react@latest tailwindcss@latest

# テストを実行
pnpm test

# ビルドを確認
pnpm build
```

**更新前のチェックリスト**:

```
□ 変更ログを確認
□ Breaking Changesがないか確認
□ テストが全て成功するか確認
□ ビルドエラーがないか確認
□ ブラウザで動作確認
```

---

## 機能追加・更新手順

### 新機能追加の流れ

#### ステップ1: 要件定義

```markdown
# 新機能: [機能名]

## 概要
[機能の説明]

## ユースケース
- [ユースケース1]
- [ユースケース2]

## 技術仕様
- [技術的な詳細]

## 受け入れ基準
- [ ] [基準1]
- [ ] [基準2]
```

#### ステップ2: データベース設計

```bash
# drizzle/schema.ts にテーブルを追加
# 例:
export const newFeature = mysqlTable("new_feature", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

# マイグレーションを実行
pnpm db:push
```

#### ステップ3: バックエンド実装

```typescript
// server/db.ts にクエリヘルパーを追加
export async function createNewFeature(data: InsertNewFeature) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(newFeature).values(data);
  return result;
}

// server/routers.ts にtRPCプロシージャを追加
newFeature: router({
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await createNewFeature({
        userId: ctx.user.id,
        title: input.title,
      });
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    return await getNewFeaturesByUser(ctx.user.id);
  }),
}),
```

#### ステップ4: フロントエンド実装

```typescript
// client/src/pages/NewFeature.tsx
import { trpc } from "@/lib/trpc";

export default function NewFeature() {
  const { data, isLoading } = trpc.newFeature.list.useQuery();
  const createMutation = trpc.newFeature.create.useMutation();

  return (
    <div>
      {/* UI実装 */}
    </div>
  );
}
```

#### ステップ5: テスト実装

```typescript
// server/new-feature.test.ts
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";

describe("New Feature", () => {
  it("should create a new feature", async () => {
    // テスト実装
  });

  it("should list features by user", async () => {
    // テスト実装
  });
});

# テスト実行
pnpm test
```

#### ステップ6: ルーティング追加

```typescript
// client/src/App.tsx
import NewFeature from "./pages/NewFeature";

function Router() {
  return (
    <Switch>
      <Route path={"/new-feature"} component={NewFeature} />
      {/* 他のルート */}
    </Switch>
  );
}
```

#### ステップ7: チェックポイント作成

```bash
# 変更をコミット
git add .
git commit -m "feat: add new feature"

# チェックポイント作成
# Management UIで「Checkpoint」を作成
```

---

## トラブルシューティング

### よくある問題と解決方法

#### 問題1: ページが表示されない

**症状**: ホームページにアクセスしても真っ白な画面が表示される

**原因と対応**:

| 原因 | 対応方法 |
|------|---------|
| サーバーが起動していない | `pnpm dev` でサーバーを起動 |
| ポート競合 | ポート3000が使用中。別のプロセスを終了 |
| ビルドエラー | `pnpm build` でエラーを確認 |
| ブラウザキャッシュ | Ctrl+Shift+Delete でキャッシュをクリア |

**確認コマンド**:

```bash
# サーバーのステータス確認
ps aux | grep "node\|tsx"

# ポート使用状況確認
lsof -i :3000

# ビルドエラー確認
pnpm build 2>&1 | head -50
```

#### 問題2: データベース接続エラー

**症状**: 「Database connection failed」というエラーが表示される

**原因と対応**:

```bash
# 1. データベースの接続情報を確認
echo $DATABASE_URL

# 2. データベースへの接続をテスト
mysql -u root -p -h localhost < /dev/null && echo "OK" || echo "NG"

# 3. マイグレーションを再実行
pnpm db:push

# 4. サーバーを再起動
pnpm dev
```

#### 問題3: APIが応答しない

**症状**: フロントエンドからAPIを呼び出しても応答がない

**原因と対応**:

```bash
# 1. サーバーログを確認
tail -50 /var/log/ai-to-manual/server.log

# 2. ネットワークを確認
curl http://localhost:3000/api/trpc/auth.me

# 3. ファイアウォール設定を確認
sudo ufw status

# 4. tRPCルーターを確認
grep -n "auth.me" server/routers.ts
```

#### 問題4: 画像が表示されない

**症状**: ホームページの画像（ヒーロー、インフォグラフィック等）が表示されない

**原因と対応**:

```bash
# 1. 画像ファイルの存在確認
ls -la client/public/

# 2. 画像パスの確認
grep "src=" client/src/pages/Home.tsx | head -5

# 3. 画像ファイルを再生成
# Management UIで「Assets」から再アップロード

# 4. ブラウザキャッシュをクリア
# Ctrl+Shift+Delete でキャッシュをクリア
```

#### 問題5: ユーザー認証に失敗する

**症状**: ログインボタンをクリックしても認証画面に進まない

**原因と対応**:

```bash
# 1. OAuth設定を確認
echo $VITE_OAUTH_PORTAL_URL
echo $VITE_APP_ID

# 2. ブラウザコンソールでエラーを確認
# F12 → Console タブ

# 3. セッションクッキーを確認
# F12 → Application → Cookies

# 4. サーバーログでOAuthエラーを確認
grep -i oauth /var/log/ai-to-manual/server.log
```

---

## バックアップ・復旧

### 自動バックアップ設定

**バックアップ対象**:

- データベース全体
- ユーザーアップロード画像
- 設定ファイル

**バックアップ頻度**:

- 日次: 毎日午前2時
- 週次: 毎週日曜日午前3時
- 月次: 毎月1日午前4時

### 手動バックアップ

```bash
# データベースのバックアップ
mysqldump -u root -p ai_to_manual > backup_$(date +%Y%m%d_%H%M%S).sql

# ファイルのバックアップ
tar -czf backup_files_$(date +%Y%m%d_%H%M%S).tar.gz client/public/

# S3へのアップロード
aws s3 cp backup_*.sql s3://backup-bucket/
aws s3 cp backup_*.tar.gz s3://backup-bucket/
```

### 復旧手順

```bash
# 1. バックアップファイルを確認
aws s3 ls s3://backup-bucket/

# 2. バックアップファイルをダウンロード
aws s3 cp s3://backup-bucket/backup_20260115_020000.sql .

# 3. データベースを復旧
mysql -u root -p ai_to_manual < backup_20260115_020000.sql

# 4. ファイルを復旧
tar -xzf backup_files_20260115_020000.tar.gz

# 5. サーバーを再起動
pnpm dev
```

---

## セキュリティ管理

### セキュリティチェックリスト

```
□ HTTPS/SSL証明書が有効か
□ データベースパスワードが強力か
□ APIキーが安全に管理されているか
□ ユーザーパスワードがハッシュ化されているか
□ SQLインジェクション対策は実装されているか
□ XSS対策は実装されているか
□ CSRF対策は実装されているか
□ レート制限が設定されているか
□ ログイン試行回数制限が設定されているか
□ 定期的なセキュリティ監査を実施しているか
```

### 環境変数の管理

**重要な環境変数**:

```
DATABASE_URL          # データベース接続文字列
JWT_SECRET            # JWTトークン署名キー
VITE_APP_ID           # OAuth アプリケーションID
OAUTH_SERVER_URL      # OAuth サーバーURL
BUILT_IN_FORGE_API_KEY # Manus API キー
```

**管理方法**:

1. Management UIの「Settings」→「Secrets」で管理
2. `.env` ファイルには絶対に保存しない
3. ローカル開発時は `.env.local` を使用（Gitに含めない）
4. 定期的にキーをローテーション（3ヶ月ごと）

### セキュリティパッチの適用

```bash
# 脆弱性をスキャン
pnpm audit

# 脆弱性を自動修正
pnpm audit --fix

# 手動修正が必要な場合
pnpm add package-name@latest

# テストして本番環境に反映
pnpm test
pnpm build
```

---

## パフォーマンス最適化

### 画像最適化

```bash
# 画像を圧縮
npx imagemin client/public/*.png --out-dir=client/public/

# WebP形式に変換
npx cwebp client/public/image.png -o client/public/image.webp
```

### キャッシュ設定

```typescript
// server/_core/index.ts でキャッシュヘッダーを設定
app.use((req, res, next) => {
  // 静的アセット
  if (req.path.startsWith('/')) {
    res.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // API
  if (req.path.startsWith('/api/')) {
    res.set('Cache-Control', 'no-cache');
  }
  next();
});
```

### データベースクエリ最適化

```sql
-- インデックスを追加
ALTER TABLE learning_logs ADD INDEX idx_userId (userId);
ALTER TABLE learning_logs ADD INDEX idx_createdAt (createdAt);

-- クエリを最適化
EXPLAIN SELECT * FROM learning_logs WHERE userId = 1 ORDER BY createdAt DESC LIMIT 10;
```

### バンドルサイズの削減

```bash
# バンドルサイズを分析
pnpm build --analyze

# 不要な依存関係を削除
pnpm remove unused-package

# Tree-shaking を有効化
# vite.config.ts で確認
```

---

## 緊急対応

### サイトがダウンした場合

**対応フロー**:

1. **状況把握** (1分以内)
   - ステータスページで状態確認
   - ユーザーからの報告を確認
   - サーバーログでエラーを確認

2. **一時対応** (5分以内)
   - サーバーを再起動
   - キャッシュをクリア
   - CDNをリセット

3. **根本原因調査** (15分以内)
   - エラーログを詳細に確認
   - データベース接続を確認
   - メモリ使用率を確認

4. **本格対応** (1時間以内)
   - 必要に応じてロールバック
   - バグ修正
   - 本番環境に反映

5. **事後対応**
   - ユーザーへの通知
   - 原因分析レポート作成
   - 再発防止策の実装

### ロールバック手順

```bash
# 1. 前回の正常なチェックポイントを確認
# Management UI → Dashboard → Checkpoint

# 2. ロールバック実行
# Management UI → Checkpoint → Rollback ボタン

# 3. 動作確認
curl https://your-domain.manus.space/

# 4. ユーザーへ通知
# 「一時的なエラーが発生していましたが、復旧しました」
```

---

## 定期レビュー

### 月次レビュー（毎月末）

**確認項目**:

- [ ] ユーザー数の推移
- [ ] 学習ログ投稿数
- [ ] フォーラム活動度
- [ ] システムの安定性
- [ ] パフォーマンス指標
- [ ] セキュリティインシデント

### 四半期レビュー（3ヶ月ごと）

**確認項目**:

- [ ] 機能の利用状況
- [ ] ユーザーフィードバック
- [ ] 技術的な改善点
- [ ] 依存ライブラリの更新状況
- [ ] セキュリティ監査結果

### 年次レビュー（毎年1月）

**確認項目**:

- [ ] 過去1年の成果
- [ ] 今年の目標設定
- [ ] 大規模な機能追加の計画
- [ ] インフラストラクチャの拡張計画
- [ ] セキュリティ戦略の見直し

---

## サポート連絡先

**問題が発生した場合**:

1. **ドキュメント確認** - このガイドのトラブルシューティングを参照
2. **ログ確認** - サーバーログでエラーを確認
3. **Manus サポート** - https://help.manus.im
4. **開発チーム** - 内部チャネルで相談

---

## 変更履歴

| バージョン | 日付 | 変更内容 |
|-----------|------|---------|
| 1.0 | 2026-01-15 | 初版作成 |

---

**最後に更新**: 2026年1月15日  
**次回レビュー予定**: 2026年2月15日
