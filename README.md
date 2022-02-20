# Sample To-Do List App Frontend by Next.js

Next.js による TODO リストのサンプルフロントエンドアプリケーション

# 0. 前提

- [バックエンド API](https://github.com/typestar-y/to-do_api_express) をローカルホストの `3001` 番ポートで起動していること

# 1. 機能

## 1-1. タスク作成・一覧表示

![11-12_create_search](https://user-images.githubusercontent.com/51914044/154844252-76446b24-2ef3-46eb-aace-b434fa3e9ce3.gif)

### 概要

- 以下項目に入力された値でタスクを作成する
  - 名前
  - 期日
- ステータスは `ToDo` 固定となる
- 作成されたタスクは画面下部に期日順で表示される

### その他

- 必須項目エラーの場合はタスク作成は行われず、エラーメッセージが表示される

## 1-2. タスクの更新

![13_update](https://user-images.githubusercontent.com/51914044/154844262-db383a84-1687-4719-8ae9-2ae12e996449.gif)

### 概要

- 既存のタスクを更新する。以下項目が変更可能
  - 名前
  - 期日
  - ステータス

### その他

- 必須項目エラーの場合はタスク更新は行われず、エラーメッセージが表示される

## 1-3. タスクの削除

![14_delete](https://user-images.githubusercontent.com/51914044/154844264-fe01a626-9815-4eed-9600-603a19315cb7.gif)

### 概要

- 既存のタスクを削除する
