import { DataSource } from 'typeorm';

import { Blocked } from './entity/Blocked';
import { Community } from './entity/Community';
import { CommunityMember } from './entity/CommunityMember';
import { Friend } from './entity/Friend';
import { FriendRequest } from './entity/FriendRequest';
import { Game } from './entity/Game';
import { League } from './entity/League';
import { LeagueMember } from './entity/LeagueMember';
import { User } from './entity/User';

const dotenv = require('dotenv');
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.NODE_ENV === 'development' ? 'localhost' : process.env.HOST,
  port: 5432,
  username: process.env.NODE_ENV === 'development' ? 'postgres' : process.env.USERNAME,
  password: process.env.NODE_ENV === 'development' ? 'test' : process.env.PASSWORD,
  database: process.env.NODE_ENV === 'development' ? 'test' : 'postgres',
  synchronize: true,
  logging: false,
  entities: [
    User,
    Friend,
    Blocked,
    FriendRequest,
    League,
    LeagueMember,
    Community,
    CommunityMember,
    Game,
  ],
  migrations: [],
  subscribers: [],
});
