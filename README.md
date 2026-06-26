# stock-monitor-docs

[stock-monitor](https://github.com/) の解説ドキュメントサイトです。リファレンス級の内部ドキュメントとは別に、**はじめての人が読み物として通読できる概説**を VitePress で配信します。

本体（アプリのコード）は private リポジトリにあります。この公開リポジトリには、人間が読むための概説 Markdown だけを置きます。コードパスや内部仕様を露出するリファレンスは同期しません。

## 構成

```text
stock-monitor-docs/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # サイト設定（ナビ・サイドバー・検索・mermaid）
│   ├── index.md               # トップページ
│   └── guide/
│       ├── overview.md        # アプリそのものの説明資料
│       └── development.md      # 開発プロセスの説明資料
├── package.json
└── .github/workflows/
    └── deploy.yml             # （任意）ビルド確認用 CI
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

## 本体（private）からの自動同期

概説 Markdown のマスターは本体 private リポジトリの `docs/public/` 側に置き、編集はそちらで行うのが推奨です（コードと一緒に PR レビューに乗るため、ドキュメントがコードからズレにくい）。本体側で更新したら、GitHub Actions でこの公開リポジトリへ自動コピーします。

セットアップ手順は本体リポジトリに置く `sync-docs-to-public.yml`（このリポジトリの `for-private-repo/` に同梱）を参照してください。要点だけ:

1. この公開リポジトリへ push できる権限を持つトークン（Fine-grained PAT か deploy key）を発行する。**トークンの発行・登録は手作業で行ってください。**
2. 本体リポジトリの Secrets にそのトークンを登録する。
3. 本体の `docs/public/**` が変わったら、ワークフローがこのリポジトリの `docs/guide/` を上書きコミットする。
4. この公開リポジトリに push が入ると Vercel/Netlify が自動ビルドする。

> 手動コピーは避けてください。二重管理になり、ドキュメントが少しずつコードからズレていきます（docs drift）。同期は必ず自動化するのが吉です。

## 日本語の全文検索について

標準のローカル検索（minisearch）でも日本語は引けますが、語の区切り（トークナイズ）が弱く、ヒット精度が物足りないことがあります。実用で困ったら [Algolia DocSearch](https://docsearch.algolia.com/) への切り替えを検討してください（`config.ts` の `search.provider` を差し替え）。

## mermaid 図について

概説内のフロー図は [mermaid](https://mermaid.js.org/) で描いています。`vitepress-plugin-mermaid` を `config.ts` の `withMermaid()` で有効化済みです。図を使わない場合はプラグインを外し、該当の ```mermaid ブロックを削除してください。
