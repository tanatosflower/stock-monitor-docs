# スライド（Slidev デッキ）

`slides/` 配下にローカル発表・PDF エクスポート専用のスライドデッキを置くディレクトリです。
**デプロイ・CI の対象外**です（`build-check.yml` は VitePress のビルドのみ確認）。

## デッキ一覧

| ファイル | 内容 |
| --- | --- |
| `intro.md` | stock-monitor 概要紹介（歪みの狙い・2つのウォッチリスト・判定の仕組みを解説） |
| `architecture.md` | システム構成紹介（コンポーネント・処理フロー・インフラを mermaid 図付きで解説） |

## 起動

```bash
# リポジトリルートで実行
npm run slides:dev -- slides/<name>.md
```

例:
```bash
npm run slides:dev -- slides/intro.md        # http://localhost:3030
npm run slides:dev -- slides/architecture.md
```

> **注意**: `-- slides/<name>.md` の引数指定は必須です。省略すると `slides.md` を探して失敗します。

## PDF エクスポート

```bash
npm run slides:export -- slides/<name>.md
```

初回は Playwright ブラウザのインストールが必要です（Slidev が自動で促します）:
```bash
npx playwright install chromium
```

## 新しいデッキを追加するには

1. `slides/<name>.md` を作成する
2. 下記 frontmatter を先頭に付ける:

```yaml
---
theme: default
title: （デッキのタイトル）
fonts:
  sans: Noto Sans JP
  mono: Noto Sans Mono
---
```

3. `---` でスライドを区切りながらコンテンツを書く
4. `SLIDES.md` の「デッキ一覧」テーブルに 1 行追記する

## 命名規約

- ケバブケース（例: `my-new-deck.md`）
- 内容が分かる端的な名前にする
- 日本語ファイル名は避ける（CLI 引数として扱うため）
