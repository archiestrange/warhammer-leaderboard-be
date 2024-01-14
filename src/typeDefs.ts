export const typeDefs = `#graphql
  type Query {
    getUser(id: String!): User
    getUsers: [User]
  }



  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
  }



  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;
