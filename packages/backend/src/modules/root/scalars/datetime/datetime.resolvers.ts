import { GraphQLError, GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../../../../__generated__/graphql.js";

/**
 * Datetime 型のバリデーション
 */
const validateDateTime = (value: string) => {
  const RFC_3339_REGEX =
    /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60))(\.\d{1,})?(([Z])|([+|-]([01][0-9]|2[0-3]):[0-5][0-9]))$/;

  const dateTimeString = value.toUpperCase();

  if (!RFC_3339_REGEX.test(dateTimeString)) {
    return false;
  }

  return true;
}

/**
 * Datetime 型のカスタム Scalar Type の Resolver
 */
const resolvers: Resolvers = {
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "DateTime custom scalar type",
    serialize(value) {
      // サーバーからクライアントに返すときに呼ばれる
      console.log("serialize", { value })
      if (typeof value === "string") {
        return new Date(value).toISOString()
      }
      return new Date().toISOString()
    },
    parseValue(value) {
      // クライアントからのリクエストを受け取ったときに呼ばれる
      console.log("parseValue", { value })

      if (typeof value === "string") {
        if (!validateDateTime(value)) {
          throw new GraphQLError(`DateTime cannot represent an invalid Date string ${value}`)
        }

        return new Date(value)
      }

    },
    parseLiteral(ast) {
      // クライアントからのリクエストを受け取ったときに呼ばれる (primitive な値の場合)
      console.log("parseValue", { ast })

      if (!("value" in ast)) {
        throw new GraphQLError("value がありません。")
      }
      const { value } = ast

      if (ast.kind !== Kind.STRING || typeof value !== "string") {
        throw new GraphQLError(`DateTime cannot represent an invalid Date string ${value}`)
      }

      if (!validateDateTime(value)) {
        throw new GraphQLError(`DateTime cannot represent an invalid Date string ${value}`)
      }

      return new Date(value)
    }
  })
}

export default resolvers;
