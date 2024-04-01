import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';

export const getGamesList = async ({ userId, limit, offset }) => {
  console.log('getGames - info - started');

  const games = await AppDataSource.manager.findAndCount(Game, {
    where: [{ attacker: { id: userId } }, { defender: { id: userId } }],
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
