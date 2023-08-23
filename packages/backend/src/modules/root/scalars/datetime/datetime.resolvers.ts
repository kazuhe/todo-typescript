import { DateTimeResolver } from "graphql-scalars";
import { Resolvers } from "../../../../__generated__/graphql.js";


/**
 * Datetime 型のカスタム Scalar Type の Resolver
 */
const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
}

export default resolvers;
