# Vercel デプロイメント ガイド

AI-to-Manualプラットフォームを Vercel にデプロイするための完全なガイドです。

## 前提条件

- Vercelアカウント（https://vercel.com）
- GitHubリポジトリにプッシュされたコード
- 必要な環境変数の準備

## デプロイメント手順

### 1. GitHub リポジトリの準備

```bash
# ローカルリポジトリをGitHubにプッシュ
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Vercel でプロジェクトをインポート

1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. 「Add New...」 → 「Project」をクリック
3. GitHubリポジトリを選択
4. 「Import」をクリック

### 3. 環境変数の設定

Vercel プロジェクト設定で以下の環境変数を追加します：

#### 必須環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `DATABASE_URL` | MySQL/TiDB接続文字列 | `mysql://user:pass@host/db` |
| `JWT_SECRET` | セッション署名用秘密鍵 | `your-secret-key-here` |
| `VITE_APP_ID` | Manus OAuth アプリID | `app-id-from-manus` |
| `OAUTH_SERVER_URL` | Manus OAuth サーバーURL | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | Manus ログインポータルURL | `https://login.manus.im` |
| `OWNER_OPEN_ID` | オーナーのOpenID | `owner-open-id` |
| `OWNER_NAME` | オーナー名 | `Your Name` |
| `BUILT_IN_FORGE_API_URL` | Manus Forge API URL | `https://api.manus.im/forge` |
| `BUILT_IN_FORGE_API_KEY` | Forge API キー（サーバー側） | `api-key-here` |
| `VITE_FRONTEND_FORGE_API_KEY` | Forge API キー（フロントエンド） | `frontend-api-key` |
| `VITE_FRONTEND_FORGE_API_URL` | Forge API URL（フロントエンド） | `https://api.manus.im/forge` |
| `VITE_APP_TITLE` | アプリケーション名 | `AI-to-Manual` |
| `VITE_APP_LOGO` | ロゴURL | `/logo.png` |
| `VITE_ANALYTICS_ENDPOINT` | アナリティクスエンドポイント | `https://analytics.example.com` |
| `VITE_ANALYTICS_WEBSITE_ID` | ウェブサイトID | `website-id` |

#### 環境変数の設定方法

1. Vercel プロジェクト設定 → 「Environment Variables」
2. 各変数を追加
3. 「Save」をクリック

### 4. ビルド設定の確認

Vercel は自動的に以下を検出します：

- **Framework**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `client/dist`
- **Install Command**: `pnpm install`

必要に応じて「Settings」 → 「Build & Deployment」で調整してください。

### 5. デプロイメント実行

1. 「Deploy」ボタンをクリック
2. デプロイが完了するまで待機（通常 3-5 分）
3. デプロイ完了後、自動生成されたURLでアクセス可能

## トラブルシューティング

### ビルドエラー

**問題**: `pnpm: command not found`

**解決策**:
```bash
# Vercel 設定で Node.js バージョンを確認
# Settings → Build & Development → Node.js Version を 18.x 以上に設定
```

### データベース接続エラー

**問題**: `Error: connect ECONNREFUSED`

**解決策**:
1. `DATABASE_URL` が正しく設定されているか確認
2. データベースがVercelからアクセス可能か確認
3. ファイアウォール設定を確認

### OAuth エラー

**問題**: `OAuth callback failed`

**解決策**:
1. Manus OAuth 設定でリダイレクトURI を確認
2. リダイレクトURI に Vercel のドメインを追加
   - 例: `https://your-project.vercel.app/api/oauth/callback`

## 本番環境での推奨設定

### 1. カスタムドメイン設定

1. Vercel プロジェクト → 「Settings」 → 「Domains」
2. 「Add」をクリック
3. ドメイン名を入力
4. DNS レコードを設定

### 2. 自動デプロイメント設定

- **Production Branch**: `main`
- **Preview Deployments**: Pull Request ごとにプレビュー生成
- **Automatic Deployments**: `main` ブランチへのプッシュで自動デプロイ

### 3. セキュリティ設定

- **Environment Variables**: Production/Preview で異なる値を設定可能
- **Protected Routes**: 本番環境では認証が必須

### 4. モニタリング

1. Vercel Analytics を有効化
2. エラーログを確認
3. パフォーマンスメトリクスを監視

## 更新とロールバック

### 新しいバージョンをデプロイ

```bash
git push origin main
# Vercel が自動的にデプロイを開始
```

### 前のバージョンにロールバック

1. Vercel ダッシュボード → 「Deployments」
2. ロールバック対象のデプロイを選択
3. 「Promote to Production」をクリック

## パフォーマンス最適化

### 1. キャッシング設定

`vercel.json` で静的ファイルのキャッシュを設定：

```json
{
  "headers": [
    {
      "source": "/client/dist/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 2. 画像最適化

- 画像は WebP 形式で提供
- 適切なサイズでリサイズ
- CDN キャッシュを活用

### 3. データベース最適化

- クエリインデックスを確認
- N+1 クエリ問題を解決
- 接続プーリングを設定

## よくある質問

**Q: Vercel で無料プランは使用できますか？**

A: はい。ただし、以下の制限があります：
- 月間 100GB の帯域幅
- 最大 12 個の Serverless Functions
- 本番環境のみ

**Q: データベースはどこに置くべきですか？**

A: 以下のオプションがあります：
- Vercel Postgres（推奨）
- 外部 MySQL/TiDB ホスティング
- AWS RDS、Google Cloud SQL など

**Q: 環境変数を安全に管理するには？**

A: Vercel の Environment Variables 機能を使用：
- Production/Preview で異なる値を設定可能
- 暗号化されて保存
- ログには表示されない

## サポート

問題が発生した場合：

1. [Vercel ドキュメント](https://vercel.com/docs)を確認
2. [Vercel コミュニティ](https://vercel.com/support)に相談
3. ローカルで `pnpm dev` で動作確認

## 次のステップ

- [ ] GitHub リポジトリを準備
- [ ] Vercel アカウントを作成
- [ ] 環境変数を設定
- [ ] デプロイメントを実行
- [ ] 本番環境でテスト
- [ ] カスタムドメインを設定
- [ ] モニタリングを有効化
