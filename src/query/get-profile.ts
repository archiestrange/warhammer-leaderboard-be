import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { User } from '../entity/User';

type Args = Pick<User, 'id'>;

export const getProfile = async ({ id }: Args) => {
  console.log('getProfile - info - started');

  console.log('getProfile - info - Trying to find user with matching id...');
  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id },
  });

  if (!existingUser) {
    console.log('getProfile - warning - No user found with that id');
    throw new Error('No user could be found with that id');
  }

  const allGamesCount = await AppDataSource.manager.find(Game, {
    where: [{ attacker: { id } }, { defender: { id } }],
    relations: {
      attacker: true,
      defender: true,
    },
  });

  console.log('getProfile - success - User found!');

  // Totals
  const totalGames = (allGamesCount ?? []).length;
  const totalWins = (allGamesCount ?? []).filter((f) => {
    if (f.attacker?.id === id) {
      return f.attackerPoints > f.defenderPoints;
    } else {
      return f.attackerPoints < f.defenderPoints;
    }
  });
  const totalLosses = (allGamesCount ?? []).filter((f) => {
    if (f.attacker?.id === id) {
      return f.attackerPoints < f.defenderPoints;
    } else {
      return f.attackerPoints > f.defenderPoints;
    }
  });
  const totalDraws = (allGamesCount ?? []).filter((f) => {
    return f.attackerPoints === f.defenderPoints;
  });

  // Totals as attacker
  const totalGamesAsAttacker = (allGamesCount ?? []).filter((f) => {
    return f.attacker?.id === id;
  });

  const totalWinsAsAttacker = (totalGamesAsAttacker ?? []).filter((f) => {
    return f.attackerPoints > f.defenderPoints;
  });

  const totalLossesAsAttacker = (totalGamesAsAttacker ?? []).filter((f) => {
    return f.attackerPoints < f.defenderPoints;
  });

  const totalDrawsAsAttacker = (totalGamesAsAttacker ?? []).filter((f) => {
    return f.attackerPoints === f.defenderPoints;
  });

  // Total as defender
  const totalGamesAsDefender = (allGamesCount ?? []).filter((f) => {
    return f.defender?.id === id;
  });

  const totalWinsAsDefender = (totalGamesAsDefender ?? []).filter((f) => {
    return f.attackerPoints < f.defenderPoints;
  });

  const totalLossesAsDefender = (totalGamesAsDefender ?? []).filter((f) => {
    return f.attackerPoints > f.defenderPoints;
  });

  const totalDrawsAsDefender = (totalGamesAsDefender ?? []).filter((f) => {
    return f.attackerPoints === f.defenderPoints;
  });

  // CP!

  // -- Wins CP
  const totalCPOnWins = totalWins.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === id
        ? currentValue.attackerAveragePoints
        : currentValue.defenderAveragePoints),
    0,
  );

  const averageCPOnWins = totalCPOnWins / totalWins.length;

  const totalCPOnWinsAsAttacker = totalWinsAsAttacker.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const averageCPOnWinsAsAttacker = totalCPOnWinsAsAttacker / totalWinsAsAttacker.length;

  const totalCPOnWinsAsDefender = totalWinsAsDefender.reduce(
    (accumulator, currentValue) => accumulator + currentValue.defenderAveragePoints,
    0,
  );
  const averageCPOnWinsAsDefender = totalCPOnWinsAsDefender / totalWinsAsDefender.length;

  // -- Losses CP
  const totalCPOnLosses = totalLosses.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === id
        ? currentValue.attackerAveragePoints
        : currentValue.defenderAveragePoints),
    0,
  );

  const averageCPOnLosses = totalCPOnLosses / totalLosses.length;

  const totalCPOnLossesAsAttacker = totalLossesAsAttacker.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const averageCPOnLossesAsAttacker = totalCPOnLossesAsAttacker / totalLossesAsAttacker.length;

  const totalCPOnLossesAsDefender = totalLossesAsDefender.reduce(
    (accumulator, currentValue) => accumulator + currentValue.defenderAveragePoints,
    0,
  );
  const averageCPOnLossesAsDefender = totalCPOnLossesAsDefender / totalLossesAsDefender.length;

  // -- Draws CP
  const totalCPOnDraws = totalDraws.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const averageCPOnDraws = totalCPOnDraws / totalDraws.length;

  const totalCPOnDrawsAsAttacker = totalDrawsAsAttacker.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const averageCPOnDrawsAsAttacker = totalCPOnDrawsAsAttacker / totalDrawsAsAttacker.length;

  const totalCPOnDrawsAsDefender = totalDrawsAsDefender.reduce(
    (accumulator, currentValue) => accumulator + currentValue.defenderAveragePoints,
    0,
  );

  const averageCPOnDrawsAsDefender = totalCPOnDrawsAsDefender / totalDrawsAsDefender.length;

  return {
    user: existingUser,
    games: {
      totalGames: {
        totalGames: totalGames,
        totalWins: totalWins.length,
        totalLosses: totalLosses.length,
        totalDraws: totalDraws.length,
      },
      attacker: {
        totalGamesAsAttacker: totalGamesAsAttacker.length,
        totalWinsAsAttacker: totalWinsAsAttacker.length,
        totalLossesAsAttacker: totalLossesAsAttacker.length,
        totalDrawsAsAttacker: totalDrawsAsAttacker.length,
      },
      defender: {
        totalGamesAsDefender: totalGamesAsDefender.length,
        totalWinsAsDefender: totalWinsAsDefender.length,
        totalLossesAsDefender: totalLossesAsDefender.length,
        totalDrawsAsDefender: totalDrawsAsDefender.length,
      },
    },
    cp: {
      averageCPOnWins: isNaN(averageCPOnWins) ? 0 : averageCPOnWins,
      averageCPOnLosses: isNaN(averageCPOnLosses) ? 0 : averageCPOnLosses,
      averageCPOnWinsAsAttacker: isNaN(averageCPOnWinsAsAttacker) ? 0 : averageCPOnWinsAsAttacker,
      averageCPOnWinsAsDefender: isNaN(averageCPOnWinsAsDefender) ? 0 : averageCPOnWinsAsDefender,
      averageCPOnLossesAsAttacker: isNaN(averageCPOnLossesAsAttacker)
        ? 0
        : averageCPOnLossesAsAttacker,
      averageCPOnLossesAsDefender: isNaN(averageCPOnLossesAsDefender)
        ? 0
        : averageCPOnLossesAsDefender,
      averageCPOnDraws: isNaN(averageCPOnDraws) ? 0 : averageCPOnDraws,
      averageCPOnDrawsAsAttacker: isNaN(averageCPOnDrawsAsAttacker)
        ? 0
        : averageCPOnDrawsAsAttacker,
      averageCPOnDrawsAsDefender: isNaN(averageCPOnDrawsAsDefender)
        ? 0
        : averageCPOnDrawsAsDefender,
    },
  };
};
