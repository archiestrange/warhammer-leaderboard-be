import { In } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Friend } from '../entity/Friend';
import { Game } from '../entity/Game';

export const getFriendsGamesList = async ({ userId, limit, offset }) => {
  console.log('getGames - info - started');

  const friendList = await AppDataSource.manager.find(Friend, {
    where: [{ user: { id: userId } }],
    relations: ['user', 'friend'],
  });

  const friendIds = friendList.map((f) => f.friend.id);

  const games = await AppDataSource.manager.findAndCount(Game, {
    where: [
      { attacker: { id: In(friendIds) }, attackerHandshake: true, defenderHandshake: true },
      { defender: { id: In(friendIds) }, attackerHandshake: true, defenderHandshake: true },
    ],
    relations: { attacker: true, defender: true, league: true },
    take: limit,
    skip: offset,
    order: { date: 'DESC' },
  });

  console.log('getGames - info - success');

  return {
    data: games[0],
    count: games[1],
  };
};
