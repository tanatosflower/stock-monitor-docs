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
    Scheduler["スケジューラ\n(定期起動)"]
    Fetcher["データ取得\n(Fetcher)"]
    Evaluator["条件評価\n(Evaluator)"]
    Notifier["通知送信\n(Notifier)"]
    Store["データストア\n(DB / Cache)"]
    APIs["外部証券 API"]

    Scheduler -->|トリガー| Fetcher
    Fetcher -->|株価・指標| Store
    APIs -->|レスポンス| Fetcher
    Store -->|保存済みデータ| Evaluator
    Evaluator -->|アラート条件成立| Notifier
```

---

## 処理フロー詳細

1. **スケジューラ** が設定間隔で Fetcher を起動
2. **Fetcher** が外部証券 API を叩き、株価・指標データを取得してストアに保存
3. **Evaluator** がストアのデータに対して監視ルールを評価
4. 条件が成立したら **Notifier** が Slack / Webhook 等へ通知を送信

---

## スケーリング方針

- 取得対象銘柄の増加 → Fetcher を水平スケール（並列取得）
- ルール評価の高頻度化 → Evaluator をキューベースに切り出し
- 通知先の追加 → Notifier をプラグイン方式で拡張

---

## まとめ

各コンポーネントが**疎結合**で設計されているため、取得・評価・通知それぞれを独立して差し替え・スケールアップできます。
