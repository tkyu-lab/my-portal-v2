# AI-to-Manual - Vercel デプロイメント対応版

このプロジェクトは Vercel へのデプロイに完全対応しています。

## クイックスタート

### ローカル開発

```bash
# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev

# ブラウザで http://localhost:3000 にアクセス
```

### ビルド

```bash
# 本番用ビルド
pnpm build

# ビルド結果を確認
pnpm start
```

## Vercel デプロイメント

### 1. 事前準備

- GitHub アカウント
- Vercel アカウント（https://vercel.com）
- リポジトリを GitHub にプッシュ

### 2. Vercel でのデプロイ

```bash
# GitHub にプッシュ
git push origin main

# Vercel ダッシュボード (https://vercel.com/dashboard) で
# 「Add New...」→「Project」を選択
# GitHub リポジトリを選択してインポート
```

### 3. 環境変数の設定

Vercel プロジェクト設定で以下の環境変数を追加：

```
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im
OWNER_OPEN_ID=your-owner-id
OWNER_NAME=Your Name
BUILT_IN_FORGE_API_URL=https://api.manus.im/forge
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im/forge
VITE_APP_TITLE=AI-to-Manual
VITE_APP_LOGO=/logo.png
VITE_ANALYTICS_ENDPOINT=your-analytics-url
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```

詳細は [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) を参照してください。

## プロジェクト構成

```
ai-to-manual-platform/
├── client/                 # React フロントエンド
│   ├── src/
│   │   ├── pages/         # ページコンポーネント
│   │   ├── components/    # UI コンポーネント
│   │   ├── lib/           # ユーティリティ
│   │   └── App.tsx        # ルーティング設定
│   └── dist/              # ビルド出力
├── server/                # Express バックエンド
│   ├── routers.ts         # tRPC ルーター
│   ├── db.ts              # データベースクエリ
│   └── _core/             # フレームワークコア
├── drizzle/               # データベーススキーマ
├── vercel.json            # Vercel 設定
├── package.json           # 依存関係管理
└── VERCEL_DEPLOYMENT.md   # デプロイメントガイド
```

## 主要機能

1. **ホームページ** - ヒーロー、ロードマップ、AIトレーニング、学習ログ
2. **学習ログ** - ユーザーが進捗を投稿・共有
3. **AIトレーニング** - 習熟度別問題と進捗管理
4. **質問フォーラム** - ソクラテス式メンター機能
5. **習熟度バッジ** - ゲーミフィケーション
6. **運用・保守モジュール** - チェックリストとカレンダー
7. **GitHub同期** - コード同期と履歴管理
8. **クライアント対応シミュレーター** - 3つのトラブルシナリオ

## 技術スタック

- **フロントエンド**: React 19 + Tailwind CSS 4 + shadcn/ui
- **バックエンド**: Express 4 + tRPC 11 + Drizzle ORM
- **データベース**: MySQL/TiDB
- **認証**: Manus OAuth
- **ホスティング**: Vercel

## テスト

```bash
# ユニットテストを実行
pnpm test

# テストカバレッジを確認
pnpm test -- --coverage
```

## トラブルシューティング

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf node_modules .pnpm-store
pnpm install
pnpm build
```

### データベース接続エラー

1. `DATABASE_URL` が正しく設定されているか確認
2. データベースが Vercel からアクセス可能か確認
3. ファイアウォール設定を確認

### OAuth エラー

1. Manus OAuth リダイレクト URI を確認
2. Vercel のドメインを追加
   - 例: `https://your-project.vercel.app/api/oauth/callback`

## パフォーマンス

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## セキュリティ

- ✅ HTTPS 強制
- ✅ CORS 設定
- ✅ CSP ヘッダー
- ✅ 環境変数の暗号化
- ✅ SQL インジェクション対策（Drizzle ORM）

## ライセンス

MIT

## サポート

問題が発生した場合：

1. [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) を確認
2. [MAINTENANCE_GUIDE.md](./MAINTENANCE_GUIDE.md) を参照
3. ローカルで `pnpm dev` で動作確認

## 次のステップ

- [ ] GitHub にプッシュ
- [ ] Vercel でデプロイ
- [ ] 環境変数を設定
- [ ] 本番環境でテスト
- [ ] カスタムドメインを設定
- [ ] モニタリングを有効化
