```bash
src
├─actions #バックエンドの処理（ServerAction）
│      auth.ts
│      post.ts
│      
├─app #フロントエンドの処理（ページコンポーネント）
│  │  favicon.ico
│  │  globals.css
│  │  Header.tsx
│  │  layout.tsx
│  │  Loader.tsx
│  │  page.module.css
│  │  page.tsx
│  │  PostList.tsx
│  │
│  ├─login
│  │      page.tsx
│  │
│  ├─posts
│  │  ├─create
│  │  │      page.tsx
│  │  │
│  │  └─[id]
│  │          DeletePostButton.tsx
│  │          page.tsx
│  │          PostDetail.tsx
│  │
│  └─signup
│          page.tsx
│
├─entities #DBのテーブル構造をTypeScriptで定義
│      Post.ts
│      User.ts
│
├─migrations #DBのマイグレーションファイル
│      1766045115170-Initialize.ts
│      1766125339763-CreatePost.ts
│
└─utils #上記の分類に入らないファイル
        data-source.ts
        jwt.ts
        session.ts
```