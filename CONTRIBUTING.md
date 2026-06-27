# コントリビュートガイド

このファイルは、ドキュメントの編集・保守をする方向けのメモです。README が「使う人向けの入口フロー」であるのに対して、こちらは「作る人・直す人向け」の情報をまとめています。

## 編集の基本方針

- **文体規約**: 全面日本語・ですます調の読み物トーン。本体 `stock-monitor` の硬いリファレンス調とは別物として書きます。
- **正本との整合**: `docs/guide/` の内容は、本体 private リポジトリ `stock-monitor` の `docs/` ディレクトリおよびルート `README.md` が正本です。事実関係に齟齬が生じないよう正本を確認してから書きます。
- **本体リポジトリの扱い**: 本体 `stock-monitor` は **読込のみ**。絶対に編集しないこと。

## ページを追加するには

1. `docs/guide/<name>.md` を作成する
2. frontmatter に `title` と `description` を必ず付ける:

   ```yaml
   ---
   title: ページのタイトル
   description: このページの一行説明
   ---
   ```

3. `docs/.vitepress/config.ts` の `nav` と `sidebar` を手動で更新する（自動追加はされません）
4. ローカルで `npm run docs:dev` を起動して表示を確認する
5. PR を出す前に `npm run lint` でチェックを通す（自動整形は `npm run lint:fix`）

## mermaid / CJK の保守メモ

概説内のフロー図は [mermaid](https://mermaid.js.org/) で描いています。`vitepress-plugin-mermaid` を `config.ts` の `withMermaid()` で有効化済みです。

| 目的 | ファイル | 調整箇所 |
| --- | --- | --- |
| フォント・文字サイズ（CJK グリフ切れ対策） | `docs/.vitepress/config.ts` | `mermaid.themeVariables.fontFamily` / `fontSize` |
| mermaid 図の中央寄せ | `docs/.vitepress/theme/custom.css` | `.mermaid` の flex 設定 |
| 表セルの日本語折返し | `docs/.vitepress/theme/custom.css` | `.vp-doc th, .vp-doc td` の `word-break` |

CJK の `**bold**` が壊れる問題は `markdown-it-cjk-friendly` プラグインで対処しています（cjk-friendly は VitePress 2.0 が標準採用する挙動を 1.x に先取りするものです）。

## 日本語の全文検索について

標準のローカル検索（minisearch）でも日本語は引けますが、語の区切り（トークナイズ）が弱く、ヒット精度が物足りないことがあります。実用で困ったら [Algolia DocSearch](https://docsearch.algolia.com/) への切り替えを検討してください（`config.ts` の `search.provider` を差し替え）。

## コントリビュートの方針

- **誤字・事実誤りの修正 PR は歓迎します**。気軽に出してください。
- **大きめの構成変更**（ページ追加・削除、構成の組み替えなど）は、事前に issue で相談してから進めると衝突が防げます。
- **本体 `stock-monitor` との事実齟齬の指摘**も歓迎です。正本に合わせて修正します。
- PR を受け取るかどうかの最終判断は管理者に委ねます。受け取れない場合も説明します。
