const typeDefs = `#graphql
  input GetTodoInput {
    id: ID!
  }

  type GetTodoResponse {
    todo: Todo!
  }

  type Query {
    getTodo(getTodoInput: GetTodoInput!): GetTodoResponse
  }
`;

export default typeDefs;
