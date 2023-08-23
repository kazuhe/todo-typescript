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
import getTodoTypeDefs from "./modules/todos/get-todo/get-todo.typeDefs.js";
import getTodoResolvers from "./modules/todos/get-todo/get-todo.resolvers.js";
import removeTodoTypeDefs from "./modules/todos/remove-todo/remove-todo.typeDefs.js";
import removeTodoResolvers from "./modules/todos/remove-todo/remove-todo.resolvers.js";
import updateTodoTypeDefs from "./modules/todos/update-todo/update-todo.typeDefs.js";
import updateTodoResolvers from "./modules/todos/update-todo/update-todo.resolvers.js";
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
      getTodoTypeDefs,
      getTodosTypeDefs,
      removeTodoTypeDefs,
      updateTodoTypeDefs
    ]),
    resolvers: mergeResolvers([
      greetResolvers,
      makeTodoResolvers,
      getTodoResolvers,
      getTodosResolvers,
      removeTodoResolvers,
      updateTodoResolvers
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
