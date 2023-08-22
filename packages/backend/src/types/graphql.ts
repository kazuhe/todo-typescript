import express from "express";
import { PrismaClient } from "@prisma/client";

/**
 * GraphQL サーバーの起動時に生成され、リクエスト毎に resolver に渡されるオブジェクト
 * リクエスト毎の状態やデータの受け渡しに利用される
 */
export type MyContext = {
  req: express.Request;
  res: express.Response;
  prismaClient: PrismaClient;
};
