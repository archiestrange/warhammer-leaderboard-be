import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';

export const getGamesByLeagueList = async ({ leagueId, limit, offset }) => {
  console.log('getGamesByLeagueList - info - started');

  const games = await AppDataSource.manager.findAndCount(Game, {
    where: { league: { id: leagueId }, attackerHandshake: true, defenderHandshake: true },
    relations: { attacker: true, defender: true, league: true },
    take: limit,
    skip: offset,
    order: { date: 'DESC' },
  });

  console.log('getGamesByLeagueList - info - success');

  return {
    data: games[0],
    count: games[1],
  };
};
