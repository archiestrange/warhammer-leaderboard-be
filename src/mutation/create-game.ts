import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { League } from '../entity/League';
import { User } from '../entity/User';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';

export const createGame = async ({
  attackerId,
  defenderId,
  leagueId,
  attackerPoints,
  defenderPoints,
  attackerArmy,
  defenderArmy,
  score,
}) => {
  console.log('createGame - info - started');
  console.log('createGame - info - Validating user exists...');

  const attacker = attackerId
    ? await AppDataSource.manager.findOne(User, {
        where: { id: attackerId },
      })
    : null;

  const defender = defenderId
    ? await AppDataSource.manager.findOne(User, {
        where: { id: defenderId },
      })
    : null;

  if (!attacker && !defender) {
    console.log('createGame - warning - you can not save a game with no players');
    throw new Error('No players provided');
  }

  console.log('createGame - warning - finding league');

  const league = leagueId
    ? await AppDataSource.manager.findOne(League, {
        where: { id: leagueId },
      })
    : null;

  console.log('createGame - info - Creating new league item.');

  const game = new Game();
  game.date = getExactTimeFromDate(new Date());
  game.attacker = attacker || null;
  game.attackerArmy = attackerArmy;
  game.defenderArmy = defenderArmy;
  game.score = score;
  game.defender = defender || null;
  game.attackerPoints = attackerPoints;
  game.defenderPoints = defenderPoints;
  game.league = league || null;

  console.log('createGame - info - Saving new league item to database...');

  await AppDataSource.manager.insert(Game, game);

  return game;
};
