# Sample To-Do List App Frontend by Next.js

Next.js による TODO リストのサンプルフロントエンドアプリケーション

# 0. 前提

- [バックエンド API](https://github.com/typestar-y/to-do_api_express) をローカルホストの `3001` 番ポートで起動していること

# 1. 機能

## 1-1. タスク作成・一覧表示

![11-12_create_search](https://user-images.githubusercontent.com/51914044/155824104-e4c3f4f4-eb57-4300-8101-c68dcc1e4b98.gif)

### 概要

- 以下項目に入力された値でタスクを作成する
  - 名前
  - 期日
- ステータスは `ToDo` 固定となる
- 作成されたタスクは画面下部に期日順で表示される

### その他

- 必須項目エラーの場合はタスク作成は行われず、エラーメッセージが表示される

## 1-2. タスクの更新

![13_update](https://user-images.githubusercontent.com/51914044/155824110-b6dd5db9-b64e-4636-a381-225e246385c1.gif)

### 概要

- 既存のタスクを更新する。以下項目が変更可能
  - 名前
  - 期日
  - ステータス

### その他

- 必須項目エラーの場合はタスク更新は行われず、エラーメッセージが表示される

## 1-3. タスクの削除

![14_delete](https://user-images.githubusercontent.com/51914044/155824115-a0b14d7a-f64d-4354-bc21-b3ad9c2e0cf4.gif)

### 概要

- 既存のタスクを削除する
