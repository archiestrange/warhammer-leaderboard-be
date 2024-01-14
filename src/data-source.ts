import { DataSource } from 'typeorm';

import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'development' ? 'localhost' : 'real-db-host',
  port: 5432,
  username: process.env.NODE_ENV === 'development' ? 'postgres' : 'real-db-username',
  password: process.env.NODE_ENV === 'development' ? 'test' : 'real-db-password',
  database: process.env.NODE_ENV === 'development' ? 'dumbphone' : 'real-db-database',
  synchronize: true,
  logging: false,
  entities: [
    User,
    // Add more here...
  ],
  migrations: [],
  subscribers: [],
});
