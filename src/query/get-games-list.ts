import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';

export const getGamesList = async ({ userId, handshakes, limit, offset }) => {
  console.log('getGames - info - started');

  let games;
  if (handshakes) {
    games = await AppDataSource.manager.findAndCount(Game, {
      where: [
        { attacker: { id: userId }, attackerHandshake: false },
        { attacker: { id: userId }, defenderHandshake: false },
        { defender: { id: userId }, attackerHandshake: false },
        { defender: { id: userId }, defenderHandshake: false },
      ],
      relations: { attacker: true, defender: true, league: true },
      take: limit,
      skip: offset,
      order: { date: 'DESC' },
    });
  } else {
    games = await AppDataSource.manager.findAndCount(Game, {
      where: [
        { attacker: { id: userId }, attackerHandshake: true, defenderHandshake: true },
        { defender: { id: userId }, attackerHandshake: true, defenderHandshake: true },
      ],
      relations: { attacker: true, defender: true, league: true },
      take: limit,
      skip: offset,
      order: { date: 'DESC' },
    });
  }

  console.log('getGames - info - success');

  return {
    data: games[0],
    count: games[1],
  };
};
