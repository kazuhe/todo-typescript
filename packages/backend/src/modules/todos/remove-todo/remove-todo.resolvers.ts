import { GraphQLError } from "graphql";
import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

/**
 * ToDo を削除する
 */
const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeTodo: async (_, { removeTodoInput }, { prismaClient }, info) => {
      const existingTodo = await prismaClient.todo.findUnique({
        where: { id: removeTodoInput.id },
      })

      if (!existingTodo) {
        throw new GraphQLError("ToDo が見つかりませんでした。")
      }

      await prismaClient.todo.delete({
        where: { id: removeTodoInput.id },
      })

      return {
        todo: existingTodo
      }
    }
  },
};

export default resolvers;
