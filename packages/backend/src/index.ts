import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

type MyContext = {
  req: express.Request;
  res: express.Response;
};

/**
 * データ構造と操作の定義
 */
const typeDefs = `#graphql
  type Query {
    greet: String
  }
`;

/**
 * データ操作の実装
 */
const resolvers = {
  Query: {
    greet: async (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _: unknown,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      args: unknown,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      context: MyContext,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      info: unknown,
    ) => {
      return "Hello World!";
    },
  },
};

const main = async () => {
  const PORT = process.env.PORT || 5555;
  const app = express();

  const httpServer = http.createServer(app);
  const server = new ApolloServer<MyContext>({
    typeDefs: mergeTypeDefs([typeDefs]),
    resolvers: mergeResolvers([resolvers]),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );

  await new Promise<void>((resolvers) => {
    httpServer.listen({ port: PORT }, resolvers);
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}`);
};

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
