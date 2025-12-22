# Vercel デプロイ計画

## 概要
React アプリ（Vite）を Vercel でホスティング（無料プラン）

## Vercelの特徴
- 無料プラン: 個人プロジェクトに十分
- GitHub連携: mainブランチへのプッシュで自動デプロイ
- プレビュー環境: PRごとにプレビューURLを自動生成
- HTTPS: 自動設定
- CDN: グローバル配信

## 構成

```
date-calculation/
├── react-app/           # デプロイ対象
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── vercel.json      # Vercel設定（オプション）
├── .github/
│   └── workflows/
│       └── test.yml     # プッシュ時のテスト実行
└── vercel.json          # ルートのVercel設定（モノレポ用）
```

## 実装ステップ

### Step 1: Vercel設定ファイル作成
```json
// vercel.json（ルート）
{
  "buildCommand": "cd react-app && npm install && npm run build",
  "outputDirectory": "react-app/dist",
  "installCommand": "cd react-app && npm install",
  "framework": "vite"
}
```

### Step 2: GitHub Actions（テスト用）
```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, feature/*]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: cd react-app && npm ci
      - name: Run tests
        run: cd react-app && npm run test:run
      - name: Build
        run: cd react-app && npm run build
```

### Step 3: Vercelプロジェクト設定（手動）
1. https://vercel.com にアクセス
2. GitHubアカウントでログイン
3. 「New Project」→ リポジトリをインポート
4. 設定:
   - Framework Preset: Vite
   - Root Directory: `react-app`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. 「Deploy」をクリック

## 自動デプロイの仕組み
- **mainブランチ**: プッシュ時に本番環境へ自動デプロイ
- **PRブランチ**: プレビューURLを自動生成
- **GitHub Actions**: テストを実行（デプロイはVercelが担当）

## 出力
- 本番URL: `https://<project-name>.vercel.app`
- プレビューURL: `https://<project-name>-<branch>-<user>.vercel.app`

## 将来の拡張
- カスタムドメイン設定（Vercel管理画面から）
- 環境変数設定（必要に応じて）
- AWS CDKへの移行（必要に応じて）
