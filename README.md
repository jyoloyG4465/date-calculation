# 日付計算ツール

## 概要

日付に関する計算機能を提供するウェブアプリケーションです。日数差計算、N日後計算、問い合わせフォームの3つの機能を備えています。
入力した日付情報はブラウザのローカルストレージに保存され、次回アクセス時にも再利用できます。

![日付計算ツールの画面](./img/screenshot.png)

## 主な機能

### 日数差計算

- 開始日と終了日を指定して日数・週数・月数を自動計算
- 今日の日付をワンクリックで設定可能
- 入力した日付情報をローカルストレージに保存・呼び出し

### N日後計算

- 基準日からN日後（またはN日前）の日付を計算
- 計算結果の曜日も表示
- 今日の日付をワンクリックで設定可能

### 問い合わせフォーム

- お問い合わせ機能（Server Actions 使用）
- セキュリティ対策（Bot対策、バリデーション）

### 共通機能

- 入力値のバリデーション（西暦 1900 年以降の半角数字のみ受け付け）
- レスポンシブ対応（モバイル表示対応）

## ディレクトリ構成

```
date-calculation/
├── front-end/               # Next.js アプリケーション
│   ├── app/                 # App Router
│   │   ├── page.tsx         # ホームページ
│   │   ├── date-calculation/# 日数差計算
│   │   ├── date-after-days/ # N日後計算
│   │   └── contact/         # 問い合わせフォーム
│   ├── shared/              # 共有コンポーネント・ユーティリティ
│   │   ├── components/      # UIコンポーネント
│   │   ├── contexts/        # React Context
│   │   ├── hooks/           # カスタムフック
│   │   └── types/           # 型定義
│   └── lib/                 # ライブラリ設定
├── cdk/                     # AWS CDK インフラ
├── img/                     # 画像
└── README.md
```

## 技術スタック

| カテゴリ       | 技術                       |
| -------------- | -------------------------- |
| フレームワーク | Next.js 16 (App Router)    |
| UI ライブラリ  | React 19                   |
| 言語           | TypeScript                 |
| スタイリング   | MUI (Material-UI) + Emotion|
| テスト         | Jest + Testing Library     |
| メール送信     | Resend                     |
| 状態管理       | React Context + useState   |
| インフラ       | AWS CDK                    |

## 工夫した点

### コンポーネント設計

- **単一責任の原則**: 各コンポーネントは 1 つの役割に集中
- **再利用性**: DateField は各ページで共通利用
- **MUI の活用**: 一貫性のある UI とアクセシビリティを実現

### 日付計算ロジック

- **純粋関数**: 計算ロジックを utils に分離し、テスト容易性を確保
- **月末考慮**: 1/31 → 2/28 のような月末計算を正確に処理
- **ヘルパー関数**: `getLastDayOfMonth`, `isEndOfMonth`, `addMonths` で可読性向上

### Server Actions

- **サーバーサイド処理**: 問い合わせフォームは Server Actions を使用
- **セキュリティ対策**: Bot対策（ハニーポット）、入力バリデーション
- **メール送信**: Resend を使用した信頼性の高いメール配信

### UX 改善

- **コンテキストメニュー**: 歯車ボタンで保存/呼出メニューを表示
- **オーバーレイ方式**: メニュー外クリックで自然に閉じる
- **トースト通知**: 保存/呼出の結果をフィードバック

### データ永続化

- **LocalStorage**: 既存データとの互換性を維持
- **カスタムフック**: `useLocalStorage` でロジックを抽象化

## 開発環境のセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/jyoloyG4465/date-calculation.git
cd date-calculation/front-end

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

## 利用可能なスクリプト

| コマンド               | 説明                         |
| ---------------------- | ---------------------------- |
| `npm run dev`          | 開発サーバー起動             |
| `npm run build`        | 本番ビルド                   |
| `npm run start`        | 本番サーバー起動             |
| `npm run lint`         | ESLint によるコードチェック  |
| `npm run test`         | テスト実行                   |
| `npm run test:watch`   | テスト実行（ウォッチモード） |
| `npm run test:coverage`| カバレッジ生成               |

## 環境変数

問い合わせフォーム機能を使用する場合は、以下の環境変数を設定してください。

```bash
# Resend API キー
RESEND_API_KEY=re_xxxxxxxxxx

# 問い合わせメールの送信先
CONTACT_EMAIL_TO=your-email@example.com

# 問い合わせメールの送信元
CONTACT_EMAIL_FROM=noreply@your-domain.com
```

## テスト

```bash
cd front-end
npm run test
```

テストケースで以下をカバー:

- 日数・週数・月数の計算
- 月またぎ・年またぎの計算
- うるう年の計算
- 月末の計算
- バリデーション

## デプロイ

AWS CDK を使用してインフラを構築します。

```bash
cd cdk
npm install
npx cdk deploy
```

## データの保存について

- 入力した日付は、ブラウザのローカルストレージに保存されます
- 保存されたデータは他のウェブサイトからは読み込めません
- ローカルストレージは、ブラウザの設定や手動で削除しない限り保持され続けます

## 注意事項

- 入力できる年は「西暦 1900 年以降の半角数字」のみです
- 間違った日付形式を入力した場合、正しく計算されません
