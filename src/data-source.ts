import { DataSource } from 'typeorm';

import { Blocked } from './entity/Blocked';
import { Friend } from './entity/Friend';
import { FriendRequest } from './entity/FriendRequest';
import { Game } from './entity/Game';
import { League } from './entity/League';
import { LeagueMember } from './entity/LeagueMember';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'development' ? 'localhost' : 'real-db-host',
  port: 5432,
  username: process.env.NODE_ENV === 'development' ? 'postgres' : 'real-db-username',
  password: process.env.NODE_ENV === 'development' ? 'test' : 'real-db-password',
  database: process.env.NODE_ENV === 'development' ? 'test' : 'real-db-database',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Friend,
    Blocked,
    FriendRequest,
    League,
    LeagueMember,
    Game,
    // Add more here...
  ],
  migrations: [],
  subscribers: [],
});
