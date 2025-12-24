# CDK S3 + CloudFront デプロイ計画

## 概要
React アプリ（Vite）を AWS S3 + CloudFront でホスティング + GitHub Actions で自動デプロイ

## ディレクトリ構成
```
date-calculation/
├── cdk/
│   ├── bin/
│   │   └── cdk.ts              # CDKアプリエントリポイント
│   ├── lib/
│   │   └── static-site-stack.ts # S3 + CloudFront スタック
│   ├── cdk.json
│   ├── package.json
│   └── tsconfig.json
├── .github/
│   └── workflows/
│       ├── test.yml            # テスト実行（既存）
│       └── deploy-aws.yml      # AWSデプロイ（新規）
└── react-app/
    └── dist/                   # ビルド成果物（約560KB）
```

## インフラ構成

### S3 バケット
- 静的ウェブホスティング用
- パブリックアクセスブロック有効
- CloudFront OAC（Origin Access Control）経由でのみアクセス

### CloudFront
- デフォルトドメイン使用（*.cloudfront.net）
- S3オリジン + OAC
- SPA対応（エラーページで index.html にフォールバック）
- HTTPS自動対応
- キャッシュ無効化対応

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
- aws-cdk-lib（S3, CloudFront, IAM, S3 Deployment）

### Step 3: StaticSiteStack 実装
1. S3バケット作成（パブリックアクセスブロック有効）
2. CloudFront OAC作成
3. CloudFront Distribution作成
   - S3オリジン設定
   - デフォルトルートオブジェクト: index.html
   - エラーページ: 403/404 → /index.html (200)
4. S3バケットポリシー設定（CloudFrontからのアクセス許可）
5. BucketDeployment（react-app/dist → S3）

### Step 4: GitHub Actions（deploy-aws.yml）
- トリガー: mainブランチへのプッシュ
- AWS認証: OIDC（シークレットキー不要）
- 処理: ビルド → CDKデプロイ

### Step 5: AWS側の準備（手動）
1. IAM IDプロバイダ作成（GitHub OIDC）
   - プロバイダURL: `https://token.actions.githubusercontent.com`
   - 対象者: `sts.amazonaws.com`
2. IAMロール作成（CDKデプロイ用権限）
   - S3, CloudFront, IAM, CloudFormation等の権限
3. GitHub Secretsに設定:
   - `AWS_ROLE_ARN`: IAMロールのARN
   - `AWS_REGION`: ap-northeast-1

## デプロイ手順

### 前提条件
- AWS CLI設定済み（`aws configure`）
- Node.js インストール済み
- AWS IAM OIDC設定済み

### 初回デプロイ（手動）
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

### 自動デプロイ（GitHub Actions）
mainブランチにプッシュすると自動的にデプロイされます。

## 作成するファイル
1. `cdk/bin/cdk.ts`
2. `cdk/lib/static-site-stack.ts`
3. `cdk/package.json`
4. `cdk/tsconfig.json`
5. `cdk/cdk.json`
6. `.github/workflows/deploy-aws.yml`

## 料金目安
| サービス | 料金 |
|----------|------|
| S3 ストレージ | 約$0.001/月（560KB） |
| S3 リクエスト | 約$0.0004/1000リクエスト |
| CloudFront | 無料枠内（1TB/月） |
| **合計** | **月額数円〜数十円** |

## 出力
- CloudFront Distribution URL（デプロイ後にコンソールに表示）
