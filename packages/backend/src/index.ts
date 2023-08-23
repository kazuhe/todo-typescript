import http from "http";

import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { PrismaClient } from "@prisma/client";

import { MyContext } from "./types/graphql.js";
import greetTypeDefs from "./modules/root/greet/greet.typeDefs.js";
import greetResolvers from "./modules/root/greet/greet.resolvers.js";
import makeTodoTypeDefs from "./modules/todos/make-todo/make-todo.typeDefs.js";
import makeTodoResolvers from "./modules/todos/make-todo/make-todo.resolvers.js";
import getTodosTypeDefs from "./modules/todos/get-todos/get-todos.typeDefs.js";
import getTodosResolvers from "./modules/todos/get-todos/get-todos.resolvers.js";
import TodoTypeDefs from "./modules/root/models/todo.typeDefs.js";

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.$connect();

  const PORT = process.env.PORT || 5555;
  const app = express();

  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    typeDefs: mergeTypeDefs([
      greetTypeDefs,
      TodoTypeDefs,
      makeTodoTypeDefs,
      getTodosTypeDefs,
    ]),
    resolvers: mergeResolvers([
      greetResolvers,
      makeTodoResolvers,
      getTodosResolvers,
    ]),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res, prismaClient }),
    }),
  );

  await new Promise<void>((resolvers) => {
    httpServer.listen({ port: PORT }, resolvers);
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}`);
};

main().catch(async (err) => {
  console.log(err);
  await prismaClient.$disconnect();
  process.exit(1);
});
