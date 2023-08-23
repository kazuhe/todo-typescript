import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "http://localhost:5555/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Todo: {
        fields: {
          createdAt: {
            // backend からデータを取得し、frontend で利用する際に実行される
            // GraphQL の Scalar は、型定義のみで、実際に受け取ったデータは string になる
            // そのため、ここで string から Date に変換する
            read: (date) => new Date(date)
          },
          updatedAt: {
            read: (date) => new Date(date)
          }
        }
      }
    }
  }),
});

