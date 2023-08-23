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

graphql-codegen を利用し、GraphQL のスキーマから TypeScript の型定義ファイルを `packages/backend/src/__generated__/graphql.ts` に生成する。

```bash
pnpm gen:gql
```
