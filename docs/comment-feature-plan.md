# コメント機能追加 実装計画

## 概要

Supabase（無料枠）を使用してコメント機能を追加する。SSR でコメント一覧をレンダリングし、新規追加は CSR で即座に反映する。

## 確定事項

- **ホスティング**: Vercel に移行
- **対象ページ**: 全ページ（/, /date-calculation, /date-after-days）
- **認証**: なし（名前入力のみで投稿可能）

---

## 重要な変更点

### ✅ next.config.ts の変更が必要

現在 `output: "export"` で静的エクスポートしているため、SSR が使えない。

```typescript
// 削除が必要
output: "export";
```

**影響:**

- SSR/ISR が使えるようになる
- API Routes が使えるようになる
- **静的 HTML エクスポート不可になる**
- **Vercel 等の SSR 対応ホスティングが必要になる**

---

## アーキテクチャ

```
┌─────────────────────────────────────────┐
│  CommentSection (Server Component)      │
│  └─ SSRでSupabaseからコメント取得       │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ CommentList (Client Component)    │  │
│  │ ├─ CommentForm: 新規投稿          │  │
│  │ └─ CommentItem[]: 一覧表示        │  │
│  │     └─ CSRで新規追加を即座に反映  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 実装手順

### Phase 1: Supabase セットアップ ✅

1. **Supabase プロジェクト作成**

   - https://supabase.com でプロジェクト作成
   - Project URL と API Keys を取得
     project URL: https://cqfnegmeaoacnyyuabkk.supabase.co
     API KEY: sb_publishable_nfR8Rpacb36pAcyni2Ju4g_9gHfufKZ

2. **テーブル作成** ✅

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_comments_page_path ON comments(page_path);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
```

3. **RLS (Row Level Security) 設定**

```sql
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 読み取り: 全員可能
CREATE POLICY "Anyone can read comments"
  ON comments FOR SELECT USING (true);

-- 書き込み: 全員可能
CREATE POLICY "Anyone can insert comments"
  ON comments FOR INSERT WITH CHECK (true);
```

4. **環境変数設定** (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

### Phase 2: 基盤コード作成 ✅

1. **Supabase クライアント** ✅

```
front-end/lib/supabase/
├── client.ts    # Client Component用（ANON_KEY使用）
├── server.ts    # Server Component用（SERVICE_ROLE_KEY使用）
└── types.ts     # 型定義
```

2. **next.config.ts 修正** ✅
   - `output: "export"` を削除

### Phase 3: コンポーネント実装 ✅

```
front-end/shared/components/Comments/
├── index.ts
├── CommentSection.tsx   # Server Component - SSRでデータ取得
├── CommentList.tsx      # Client Component - 状態管理
├── CommentForm.tsx      # Client Component - 投稿フォーム
├── CommentItem.tsx      # Client Component - 個別表示
└── Comments.module.css  # スタイル
```

### Phase 4: ページ統合 ✅

対象ページに CommentSection を追加:

```tsx
import { CommentSection } from "@/shared/components/Comments";

export default async function Page() {
  return (
    <div>
      {/* 既存コンテンツ */}
      <CommentSection pagePath="/date-calculation" />
    </div>
  );
}
```

---

## ファイル一覧

| ファイル                                                   | 種類 | 説明                    | 状態 |
| ---------------------------------------------------------- | ---- | ----------------------- | ---- |
| `front-end/.env.local`                                     | 新規 | Supabase 環境変数       | ✅   |
| `front-end/next.config.ts`                                 | 修正 | output: "export" 削除   | ✅   |
| `front-end/lib/supabase/client.ts`                         | 新規 | クライアント用 Supabase | ✅   |
| `front-end/lib/supabase/server.ts`                         | 新規 | サーバー用 Supabase     | ✅   |
| `front-end/lib/supabase/types.ts`                          | 新規 | 型定義                  | ✅   |
| `front-end/shared/components/Comments/index.ts`            | 新規 | エクスポート            | ✅   |
| `front-end/shared/components/Comments/CommentSection.tsx`  | 新規 | Server Component        | ✅   |
| `front-end/shared/components/Comments/CommentList.tsx`     | 新規 | Client Component        | ✅   |
| `front-end/shared/components/Comments/CommentForm.tsx`     | 新規 | 投稿フォーム            | ✅   |
| `front-end/shared/components/Comments/CommentItem.tsx`     | 新規 | コメント表示            | ✅   |
| `front-end/shared/components/Comments/Comments.module.css` | 新規 | スタイル                | ✅   |
| `front-end/shared/types/comment.ts`                        | 新規 | コメント型定義          | ✅（lib/supabase/types.tsに統合）|

---

## 検証方法

1. **開発サーバー起動**

   ```bash
   cd front-end && npm run dev
   ```

2. **動作確認**

   - コメント一覧が SSR で表示されることを確認（ページソースにコメントが含まれる）
   - 新規コメント投稿後、即座に画面に反映されることを確認
   - ページリロード後も投稿したコメントが表示されることを確認

3. **Supabase ダッシュボード確認**
   - Table Editor でコメントが保存されていることを確認

---

## 注意事項

- `SUPABASE_SERVICE_ROLE_KEY` は絶対に Git にコミットしない
- `.env.local` は `.gitignore` に含まれていることを確認
- Supabase 無料枠: 500MB DB, 2GB 帯域幅/月
