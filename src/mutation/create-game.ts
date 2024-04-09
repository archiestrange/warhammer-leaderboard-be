import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { League } from '../entity/League';
import { LeagueMember } from '../entity/LeagueMember';
import { User } from '../entity/User';
import { calculateNewRank } from '../utils/calculateNewRank';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';

export const createGame = async ({
  attackerId,
  defenderId,
  leagueId,
  attackerPoints,
  defenderPoints,
  attackerAveragePoints,
  defenderAveragePoints,
  attackerArmy,
  defenderArmy,
  score,
  attackerArmyDetail,
  defenderArmyDetail,
  round1Notes,
  round2Notes,
  round3Notes,
  round4Notes,
  round5Notes,
  attackerTacticalPoints,
  defenderTacticalPoints,
  attackerFixedPoints,
  defenderFixedPoints,
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

  let defenderInLeague;
  let attackerInLeague;
  if (league) {
    defenderInLeague = await AppDataSource.manager.findOne(LeagueMember, {
      where: { league: { id: league.id }, user: { id: defenderId } },
    });
    attackerInLeague = await AppDataSource.manager.findOne(LeagueMember, {
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
  game.attackerAveragePoints = attackerAveragePoints;
  game.defenderAveragePoints = defenderAveragePoints;
  game.league = league || null;
  game.attackerHandshake = Boolean(attackerId && defenderId) ? false : true;
  game.defenderHandshake = Boolean(attackerId && defenderId) ? false : true;
  game.attackerArmyDetail = attackerArmyDetail;
  game.defenderArmyDetail = defenderArmyDetail;
  game.round1Notes = round1Notes;
  game.round2Notes = round2Notes;
  game.round3Notes = round3Notes;
  game.round4Notes = round4Notes;
  game.round5Notes = round5Notes;
  game.attackerTacticalPoints = attackerTacticalPoints;
  game.defenderTacticalPoints = defenderTacticalPoints;
  game.attackerFixedPoints = attackerFixedPoints;
  game.defenderFixedPoints = defenderFixedPoints;

  console.log('createGame - info - Saving new game item to database...');

  await AppDataSource.manager.insert(Game, game);

  // Return now if playing against player.
  // The below will be handled in the handshake stage
  if (Boolean(attackerId && defenderId)) {
    return game;
  }

  // Handle win streak updates
  if (attackerPoints > defenderPoints) {
    if (attackerId) {
      const newWinStreak = attacker.winStreak + 1;
      const updateValues = {
        winStreak: newWinStreak,
        maxWinStreak: attacker.maxWinStreak < newWinStreak ? newWinStreak : attacker.maxWinStreak,
        globalRanking:
          attackerId && defenderId
            ? calculateNewRank({
                currentRank: attacker.globalRanking,
                opponentRank: defender.globalRanking,
                isBonusPoints: attackerPoints > defenderPoints + 19,
                win: true,
              })
            : attacker.globalRanking,
      };

      await AppDataSource.manager.update(User, { id: attackerId }, updateValues);
    }

    if (defenderId) {
      await AppDataSource.manager.update(
        User,
        { id: defenderId },
        {
          winStreak: 0,
          globalRanking:
            attackerId && defenderId
              ? calculateNewRank({
                  currentRank: defender.globalRanking,
                  opponentRank: attacker.globalRanking,
                  isBonusPoints: false,
                  win: false,
                })
              : defender.globalRanking,
        },
      );
    }
  }

  if (attackerPoints < defenderPoints) {
    if (defenderId) {
      const newWinStreak = defender.winStreak + 1;
      const updateValues = {
        winStreak: newWinStreak,
        maxWinStreak: defender.maxWinStreak < newWinStreak ? newWinStreak : defender.maxWinStreak,
        globalRanking:
          attackerId && defenderId
            ? calculateNewRank({
                currentRank: defender.globalRanking,
                opponentRank: attacker.globalRanking,
                isBonusPoints: defenderPoints > attackerPoints + 19,
                win: true,
              })
            : defender.globalRanking,
      };

      await AppDataSource.manager.update(User, { id: defenderId }, updateValues);
    }

    if (attackerId) {
      await AppDataSource.manager.update(
        User,
        { id: attackerId },
        {
          winStreak: 0,
          globalRanking:
            attackerId && defenderId
              ? calculateNewRank({
                  currentRank: attacker.globalRanking,
                  opponentRank: defender.globalRanking,
                  isBonusPoints: false,
                  win: false,
                })
              : attacker.globalRanking,
        },
      );
    }
  }

  if (leagueId && attackerId && defenderId) {
    await AppDataSource.manager.update(
      LeagueMember,
      { league: { id: league.id }, user: { id: attacker.id } },
      {
        leagueRanking: calculateNewRank({
          currentRank: attackerInLeague.leagueRanking,
          opponentRank: defenderInLeague.leagueRanking,
          isBonusPoints: attackerPoints > defenderPoints + 19,
          win: attackerPoints > defenderPoints,
          draw: attackerPoints === defenderPoints,
        }),
      },
    );

    await AppDataSource.manager.update(
      LeagueMember,
      { league: { id: league.id }, user: { id: defender.id } },
      {
        leagueRanking: calculateNewRank({
          currentRank: defenderInLeague.leagueRanking,
          opponentRank: attackerInLeague.leagueRanking,
          isBonusPoints: defenderPoints > attackerPoints + 19,
          win: defenderPoints > attackerPoints,
          draw: attackerPoints === defenderPoints,
        }),
      },
    );
  }

  return game;
};
