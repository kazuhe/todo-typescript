import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

/**
 * ToDo を作成する
 */
const resolvers: Resolvers<MyContext> = {
  Mutation: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    makeTodo: async (_, { makeTodoInput }, { prismaClient }, info) => {
      const newTodo = await prismaClient.todo.create({
        data: {
          title: makeTodoInput.title,
        },
      });

      return {
        todo: newTodo
      };
    },
  },
};

export default resolvers;
