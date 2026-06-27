---
theme: default
title: stock-monitor システム構成
fonts:
  sans: Noto Sans JP
  mono: Noto Sans Mono
---

# システム構成

stock-monitor のコンポーネント構成と処理フローを説明します。

---

## コンポーネント全体像

```mermaid
flowchart TD
    Timer["Azure Functions\nタイマートリガー（5分）"]
    Price["price.py\n株価取得（yfinance）"]
    News["news.py\nニュース取得（Google News RSS）"]
    Evaluator["evaluator.py\nLLM 重要度・下落パターン判定\n（OpenRouter）"]
    Notifier["notifier.py\nDiscord Webhook 送信"]
    Store["state.json / Blob Storage\nステート管理"]

    Timer -->|起動| Price
    Timer -->|起動| News
    Price -->|株価・前日比| Store
    News -->|新着ニュース| Evaluator
    Store -->|保存済みアラート履歴| Evaluator
    Evaluator -->|重要度・センチメント| Notifier
    Price -->|マイルストーン到達| Notifier
```

---

## 処理フロー詳細

1. **Azure Functions タイマートリガー**（5分間隔）が起動
2. **price.py** が yfinance から株価を取得し、前日比がマイルストーン（閾値の倍数）を超えたら即時アラート
3. **news.py** が Google News RSS を検索し新着記事を抽出
4. **evaluator.py** が OpenRouter へ記事内容を投げ、重要度（1〜10）・センチメント・下落パターンを LLM 判定
5. 条件成立時は **notifier.py** が Discord Webhook（株価用 / ニュース用）へ送信

---

## 並列処理の仕組み

- 銘柄ごとの処理は `_concurrent.py`（`ThreadPoolExecutor` ラッパー）で並列実行
- 同時実行数は `config.json` の `max_parallel_stocks` で調整
- ステート（送信済みGUID・アラート日）は `state.py` が管理し、5分ごとの重複通知を防止

---

## まとめ

Azure Functions の単一タイマートリガーで完結するシンプルな構成です。銘柄数のスケールは `max_parallel_stocks` の調整で対応できます。
