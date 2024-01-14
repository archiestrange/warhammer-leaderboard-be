import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import 'reflect-metadata';

import { AppDataSource } from './data-source';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at: ${url}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('✅ TypeORM initialized.');
    })
    .catch((error) => console.log(error));
};

main();
