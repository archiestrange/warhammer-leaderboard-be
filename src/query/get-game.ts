import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';

export const getGame = async ({ gameId }) => {
  console.log('getGame - info - started');

  const game = await AppDataSource.manager.findOne(Game, {
    where: { id: gameId },
    relations: { attacker: true, defender: true, league: true },
  });

  console.log('getGames - info - success');

  return game;
};
