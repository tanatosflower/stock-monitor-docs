# stock-monitor-docs

[stock-monitor](https://github.com/) の解説ドキュメントサイトです。リファレンス級の内部ドキュメントとは別に、**はじめての人が読み物として通読できる概説**を VitePress で配信します。

本体（アプリのコード）は private リポジトリにあります。この公開リポジトリには、人間が読むための概説 Markdown だけを置きます。コードパスや内部仕様を露出するリファレンスは同期しません。

## 構成

```text
stock-monitor-docs/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts          # サイト設定（ナビ・サイドバー・検索・mermaid）
│   │   └── theme/
│   │       ├── index.ts       # DefaultTheme 拡張 + custom.css 読み込み
│   │       └── custom.css     # mermaid 中央寄せ、表セルの日本語折返し等
│   ├── index.md               # トップページ（layout: home）
│   └── guide/
│       ├── overview.md        # アプリ解説・システム全体像
│       ├── features.md        # 機能ガイド
│       └── development.md     # 開発プロセスの説明
├── slides/
│   ├── intro.md               # 概要紹介デッキ（雛形）
│   ├── architecture.md        # システム構成デッキ（mermaid 図付き、雛形）
│   └── README.md              # デッキ作成・起動方法メモ
├── package.json
└── .github/workflows/
    └── deploy.yml             # ビルド確認用 CI
```

## ローカルで動かす

Node.js 18 以上を推奨。

```bash
npm install
npm run docs:dev        # http://localhost:5173 で起動
```

ビルド確認:

```bash
npm run docs:build      # 出力は docs/.vitepress/dist
npm run docs:preview    # ビルド結果をローカル配信
```

## デプロイ（Vercel / Netlify）

どちらも GUI でリポジトリを連携し、以下を指定するだけです。

| 項目 | 値 |
| --- | --- |
| Build command | `npm run docs:build` |
| Output directory | `docs/.vitepress/dist` |
| Install command | `npm install` |
| Node version | 18 以上 |

push のたびに自動でビルド＆デプロイされます。

## 日本語の全文検索について

標準のローカル検索（minisearch）でも日本語は引けますが、語の区切り（トークナイズ）が弱く、ヒット精度が物足りないことがあります。実用で困ったら [Algolia DocSearch](https://docsearch.algolia.com/) への切り替えを検討してください（`config.ts` の `search.provider` を差し替え）。

## スライド（Slidev）

`slides/` 配下に [Slidev](https://sli.dev/) のデッキを置きます。**ローカル発表・PDF エクスポート専用**で、デプロイ対象・CI 対象にはしていません。

### デッキの起動

```bash
npm run slides:dev -- slides/intro.md        # http://localhost:3030
npm run slides:dev -- slides/architecture.md
```

> [!IMPORTANT]
> `-- slides/<name>.md` でデッキファイルを必ず指定してください。省略すると cwd の `slides.md` を探して失敗します。

### 複数デッキの運用

デッキごとに `slides/<name>.md` として独立したファイルを作ります。起動・エクスポート時に対象ファイルを引数で渡すだけで、設定追加は不要です。

```bash
# 例: 新しいデッキを追加したら同じように起動できる
npm run slides:dev -- slides/my-new-deck.md
```

### PDF エクスポート

```bash
npm run slides:export -- slides/intro.md
```

> [!NOTE]
> エクスポートには Playwright のブラウザバイナリが必要です。初回実行時に Slidev がインストールを促します（`npx playwright install chromium`）。

## mermaid / CJK について

概説内のフロー図は [mermaid](https://mermaid.js.org/) で描いています。`vitepress-plugin-mermaid` を `config.ts` の `withMermaid()` で有効化済みです。

CJK の `**bold**` が壊れる問題は `markdown-it-cjk-friendly` プラグインで対処しています。フォントサイズや CJK グリフ切れの調整は `config.ts` の `mermaid.themeVariables`、図の中央寄せや表セルの折返しは `theme/custom.css` で行っています。
