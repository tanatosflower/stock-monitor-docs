# stock-monitor-docs

**stock-monitor**（株価監視・自動売買システム）の概説ドキュメントサイトです。はじめての人が読み物として通読できる概説を VitePress で配信します。

**公開サイト**: https://stock-monitor-docs.vercel.app/

本体（アプリのコード）は **private リポジトリ** にあります。本体のコードパス・内部仕様は公開しません。**この docs リポジトリ自身は公開**で、人間が読む概説 Markdown だけを置きます。

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
│       ├── development.md     # 開発プロセスの説明
│       └── operations.md      # 運用・チューニングガイド
├── slides/
│   ├── intro.md               # 概要紹介デッキ（雛形）
│   ├── architecture.md        # システム構成デッキ（mermaid 図付き、雛形）
│   └── README.md              # デッキ作成・起動方法メモ
├── package.json
└── .github/workflows/
    └── build-check.yml        # ビルド確認用 CI（実デプロイは Vercel/Netlify）
```

## ローカルで動かす

Node.js 18 以上を推奨（CI は 20）。

```bash
npm install
npm run docs:dev        # http://localhost:5173 で起動
```

ビルド確認:

```bash
npm run docs:build      # 出力は docs/.vitepress/dist
npm run docs:preview    # ビルド結果をローカル確認
```

認証情報は一切不要です。本体 `stock-monitor` が必要とする API キー類はこのサイトのビルドには不要です。

## デプロイ（Vercel / Netlify）

実際のデプロイは Vercel または Netlify が行います。リポジトリ内の CI（`build-check.yml`）はビルドが通るかの確認だけです。

GUI でリポジトリを連携し、以下を指定します:

| 項目 | 値 |
| --- | --- |
| Build command | `npm run docs:build` |
| Output directory | `docs/.vitepress/dist` |
| Install command | `npm install` |

push のたびに自動でビルド＆デプロイされます。

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

## ページを追加・保守するには

mermaid・CJK 対応やページ追加手順、日本語検索の注意点など、編集者向けの情報は [CONTRIBUTING.md](./CONTRIBUTING.md) にまとめています。

## License

[MIT License](./LICENSE) — Copyright (c) 2026 tanatosflower
