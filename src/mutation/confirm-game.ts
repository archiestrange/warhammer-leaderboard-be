import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { LeagueMember } from '../entity/LeagueMember';
import { User } from '../entity/User';
import { calculateNewRank } from '../utils/calculateNewRank';

export const confirmGame = async ({ userId, gameId }) => {
  console.log('createGame - info - started');
  console.log('createGame - info - Validating user exists...');

  const game = await AppDataSource.manager.findOne(Game, {
    where: { id: gameId },
    relations: {
      attacker: true,
      defender: true,
      league: true,
    },
  });

  if (!game) {
    console.log('createGame - warning - game not found');
    throw new Error('Game not found');
  }

  if (!game.attacker && !game.defender) {
    console.log('createGame - warning - you can not save a game with no players');
    throw new Error('No players provided');
  }

  const updatedValues = {
    attackerHandshake: userId === game.attacker.id ? true : game.attackerHandshake,
    defenderHandshake: userId === game.defender.id ? true : game.defenderHandshake,
  };

  const { attackerPoints, defenderPoints, attacker, defender, league } = game;
  const attackerId = attacker?.id;
  const defenderId = defender?.id;
  const leagueId = league?.id;

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

  await AppDataSource.manager.update(Game, { id: gameId }, updatedValues);

  if (updatedValues.attackerHandshake && updatedValues.defenderHandshake) {
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
  }

  return {
    ...game,
    ...updatedValues,
  };
};
