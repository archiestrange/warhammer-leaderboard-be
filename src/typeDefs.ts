export const typeDefs = `#graphql
  type Query {
    getUser(id: Int!): User
    getUsers: [User]
  }



  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
  }



  type User {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
`;
