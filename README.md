# todo-typescript

## backend

`packages/backend/.env` に `DATABASE_URL` を定義する。

```bash
# 開発用データベース
DATABASE_URL="file:./dev.db"
```

マイグレーションを実行する。

```bash
pnpm gen:db name=<NAME>
```
