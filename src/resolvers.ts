import { createUser } from './mutation/create-user';
import { getUser } from './query/get-user';

export const resolvers = {
  Query: {
    getUser: (_, args) => getUser(args),
  },
  Mutation: {
    createUser: (_, args) => createUser(args),
  },
};
