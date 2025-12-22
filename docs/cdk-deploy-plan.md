# CDK S3 + CloudFront デプロイ計画

## 概要
React アプリ（Vite）を AWS S3 + CloudFront でホスティングするための CDK プロジェクトを作成

## 構成
```
cdk/
├── bin/
│   └── cdk.ts              # CDKアプリエントリポイント
├── lib/
│   └── static-site-stack.ts # S3 + CloudFront スタック
├── cdk.json
├── package.json
└── tsconfig.json
```

## インフラ構成

### S3 バケット
- 静的ウェブホスティング用（パブリックアクセスブロック有効）
- CloudFront OAC（Origin Access Control）経由でのみアクセス

### CloudFront
- デフォルトドメイン使用（*.cloudfront.net）
- S3オリジン + OAC
- SPA対応（エラーページで index.html にフォールバック）
- HTTPS自動対応

### 将来の拡張（手動対応）
- Route53 Hosted Zone 作成
- ACM 証明書取得（us-east-1）
- CloudFront にカスタムドメイン追加

## 実装ステップ

### Step 1: CDKプロジェクト初期化
```bash
mkdir cdk && cd cdk
npx cdk init app --language typescript
```

### Step 2: 依存関係追加
- aws-cdk-lib（S3, CloudFront, IAM）

### Step 3: StaticSiteStack 実装
1. S3バケット作成（パブリックアクセスブロック有効）
2. CloudFront OAC作成
3. CloudFront Distribution作成
   - S3オリジン設定
   - デフォルトルートオブジェクト: index.html
   - エラーページ: 403/404 → /index.html (200)
4. S3バケットポリシー設定（CloudFrontからのアクセス許可）

### Step 4: デプロイコマンド設定
package.json にデプロイスクリプト追加：
- `npm run deploy` - CDKデプロイ

### Step 5: ビルド成果物のアップロード
- BucketDeployment を使用して react-app/dist をS3にアップロード

## 重要なファイル
- `react-app/vite.config.ts`: base: './' 設定済み（相対パス）
- `react-app/dist/`: ビルド成果物

## デプロイ手順

### 前提条件
- AWS CLI設定済み（`aws configure`）
- Node.js インストール済み

### 初回デプロイ
```bash
# React アプリをビルド
cd react-app
npm run build

# CDK ディレクトリに移動
cd ../cdk

# 依存関係インストール
npm install

# CDK ブートストラップ（初回のみ）
npx cdk bootstrap

# デプロイ
npx cdk deploy
```

### 更新デプロイ
```bash
cd react-app && npm run build
cd ../cdk && npx cdk deploy
```

## 出力
- CloudFront Distribution URL（デプロイ後にコンソールに表示）
