const typeDefs = `#graphql
  input UpdateTodoInput {
    id: String!
    title: String
    isCompleted: Boolean
  }

  type UpdateTodoResponse {
    todo: Todo!
  }

  type Mutation {
    updateTodo(updateTodoInput: UpdateTodoInput!): UpdateTodoResponse!
  }
`;

export default typeDefs;
