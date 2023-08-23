const typeDefs = `#graphql
  input RemoveTodoInput {
    id: String!
  }

  type RemoveTodoResponse {
    todo: Todo!
  }

  type Mutation {
    removeTodo(removeTodoInput: RemoveTodoInput!): RemoveTodoResponse!
  }
`;

export default typeDefs;
