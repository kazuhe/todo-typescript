const typeDefs = `#graphql
  type Todo {
    id: String!
    title: String!
    isCompleted: Boolean!
    updatedAt: String!
    createdAt: String!
  }
`;

export default typeDefs;
