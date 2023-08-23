import { GraphQLError } from "graphql";
import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

/**
 * ToDo を取得する
 */
const resolvers: Resolvers<MyContext> = {
  Query: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getTodo: async (_, { getTodoInput }, { prismaClient }, info) => {
      const existingTodo = await prismaClient.todo.findUnique({
        where: { id: getTodoInput.id },
      });

      if (!existingTodo) {
        throw new GraphQLError("ToDo が見つかりませんでした。")
      }

      return {
        todo: {
          ...existingTodo,
          updatedAt: existingTodo.updatedAt.toISOString(),
          createdAt: existingTodo.updatedAt.toISOString(),
        },
      };
    },
  },
};

export default resolvers;
