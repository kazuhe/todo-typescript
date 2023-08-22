import { MyContext } from "../../../types/graphql.js";

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

export default resolvers;
