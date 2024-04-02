import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { League } from '../entity/League';
import { LeagueMember } from '../entity/LeagueMember';
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

  if (leagueId && (!attackerId || !defenderId)) {
    throw new Error(`You can't play a league game with a guest!`);
  }

  if (league) {
    const defenderInLeague = await AppDataSource.manager.findOne(LeagueMember, {
      where: { league: { id: league.id }, user: { id: defenderId } },
    });
    const attackerInLeague = await AppDataSource.manager.findOne(LeagueMember, {
      where: { league: { id: league.id }, user: { id: attackerId } },
    });

    if (!attackerInLeague || !defenderInLeague) {
      throw new Error('One of the players is not in that league!');
    }
  }

  console.log('createGame - info - Creating new game item.');

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

  console.log('createGame - info - Saving new game item to database...');

  await AppDataSource.manager.insert(Game, game);

  // Handle win streak updates

  if (attackerPoints > defenderPoints) {
    if (attackerId) {
      const newWinStreak = attacker.winStreak + 1;
      const updateValues = {
        winStreak: newWinStreak,
        maxWinStreak: attacker.maxWinStreak < newWinStreak ? newWinStreak : attacker.maxWinStreak,
      };

      await AppDataSource.manager.update(User, { id: attackerId }, updateValues);
    }

    if (defenderId) {
      await AppDataSource.manager.update(User, { id: defenderId }, { winStreak: 0 });
    }
  }

  if (attackerPoints < defenderPoints) {
    if (defenderId) {
      const newWinStreak = defender.winStreak + 1;
      const updateValues = {
        winStreak: newWinStreak,
        maxWinStreak: defender.maxWinStreak < newWinStreak ? newWinStreak : defender.maxWinStreak,
      };

      await AppDataSource.manager.update(User, { id: defenderId }, updateValues);
    }

    if (attackerId) {
      await AppDataSource.manager.update(User, { id: attackerId }, { winStreak: 0 });
    }
  }

  return game;
};
