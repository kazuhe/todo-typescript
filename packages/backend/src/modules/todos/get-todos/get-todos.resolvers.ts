import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

/**
 * ToDo リストを取得する
 */
const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTodos: async (_, args, { prismaClient }, info) => {
      const todos = await prismaClient.todo.findMany();

      return {
        todos: todos.map((todo) => ({
          ...todo,
          updatedAt: todo.updatedAt.toISOString(),
          createdAt: todo.updatedAt.toISOString(),
        })),
      };
    },
  },
};

export default resolvers;
