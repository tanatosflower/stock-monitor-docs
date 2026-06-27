# CLAUDE.md

このファイルは Claude Code (claude.ai/code) がこのリポジトリ `stock-monitor-docs` で作業する際のガイドです。

## プロジェクト概要

本体 private リポジトリ `stock-monitor` の概説を公開する VitePress サイト。内部仕様・コードパスは載せず、通読できる読み物に徹する位置づけ。本体の詳細仕様ドキュメント（`../stock-monitor/docs/`）の内容を要約・再構成したものが `docs/guide/` 配下に置かれる。

## 開発コマンド

```bash
npm install                 # 依存インストール
npm run docs:dev            # ローカルプレビュー（http://localhost:5173）
npm run docs:build          # ビルド（出力: docs/.vitepress/dist/）
npm run docs:preview        # ビルド結果のプレビュー
```

- Node 18 以上（CI は 20）
- CI（`.github/workflows/build-check.yml`）はビルド確認のみ。デプロイは Vercel / Netlify 側で行う

## 技術スタック / 主要設定

- **VitePress 1.6.4**（ESM, `type: module`）
- **vitepress-plugin-mermaid** + mermaid 11（フロー図を Markdown 内で使用）
- **markdown-it-cjk-friendly**（CJK の `**bold**` が壊れる問題への対処）
- 設定の中心は `docs/.vitepress/config.ts`（lang ja-JP, nav/sidebar, ローカル検索, mermaid テーマ変数, cleanUrls）

## ドキュメント正本のディレクトリ

ドキュメント正本は下記ディレクトリに格納されている。
`<REPO_ROOT>/docs/guide`はドキュメント正本を元に作成されているため、ドキュメント正本の内容を正として、齟齬が発生しないようにすること。

- `../stock-monitor/README.md`
- `../stock-monitor/docs/` 配下のファイル

## ディレクトリ構成

[README.md] に記載

## リポジトリ管理のルール

1. main から worktree を切る
2. worktree 内で実装・テスト
3. worktree 内でコミット、これは確認不要
4. `issue-reviewer` サブエージェントに変更内容をレビューさせ、`blocking` 指摘を解消する
5. PR 作成（gh pr create・外向き操作なので実行前に確認）
6. CI が green になるのを確認
7. squash merge（gh pr merge --squash・実行前に確認）
8. worktree の後片付け

## mermaid / CJK の調整箇所

| 目的 | ファイル | 変更箇所 |
| --- | --- | --- |
| フォント・文字サイズ（CJK グリフ切れ対策） | `docs/.vitepress/config.ts` | `mermaid.themeVariables.fontFamily` / `fontSize` |
| mermaid 図の中央寄せ | `docs/.vitepress/theme/custom.css` | `.mermaid` の flex 設定 |
| 表セルの日本語折返し | `docs/.vitepress/theme/custom.css` | `.vp-doc th, .vp-doc td` の `word-break` |

## plan 作成時及び `plan-reviewer` レビュー完了時のルール

- プランモードで実装プランを立てたら、**プランファイルに書き出した上で**、ExitPlanMode（プラン承認）を呼ぶ前に必ず `plan-reviewer` サブエージェントにそのプランファイルをレビューさせ、`blocking` 指摘を解消してから承認へ進むこと（軽微・trivial なプランも除外しない＝無条件。プラン段階での手戻り防止）。
- `plan-reviewer` サブエージェントのレビューサマリーはユーザに同じ内容を通知すること。

## ドキュメント編集のルール

- `docs/guide/` に md を追加したら `config.ts` の nav / sidebar も手動更新する
- frontmatter に `title` と `description` を必ず付ける
- 文体規約: **全面日本語・ですます調の読み物トーン**。本体側 docs の硬いリファレンス調とは別物
- `**bold**` は CJK プラグイン前提で問題ない
- mermaid フロー図を積極的に使う
- md を追加・編集したら `npm run lint` でチェックを通すこと。自動整形は `npm run lint:fix`
- 本体 private リポジトリ `stock-monitor` のファイルは読込のみ。絶対に編集しないこと。
