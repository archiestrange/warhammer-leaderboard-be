import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { LeagueMember } from '../entity/LeagueMember';
import { User } from '../entity/User';

type Args = Pick<User, 'id'>;

export const getProfile = async ({ id }: Args) => {
  console.log('getProfile - info - started');

  console.log('getProfile - info - Trying to find user with matching id...');
  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id },
  });

  const query = `
    SELECT subquery.rowNumber
    FROM (
      SELECT id, ROW_NUMBER() OVER (ORDER BY "globalRanking" DESC, "date" ASC) AS rownumber
      FROM "user"
    ) AS subquery
    WHERE subquery.id = $1
  `;

  const result = await AppDataSource.manager.query(query, [id]);

  const rowNumber = parseInt(result?.[0]?.rownumber ?? 0);

  if (!existingUser) {
    console.log('getProfile - warning - No user found with that id');
    throw new Error('No user could be found with that id');
  }

  const allGamesCount = await AppDataSource.manager.find(Game, {
    where: [
      { attacker: { id }, attackerHandshake: true, defenderHandshake: true },
      { defender: { id }, attackerHandshake: true, defenderHandshake: true },
    ],
    relations: {
      attacker: true,
      defender: true,
    },
  });

  console.log('getProfile - success - User found!');

  // Totals
  const totalGames = allGamesCount ?? [];

  const totalGamesAsTactical = (allGamesCount ?? []).filter(
    (f) =>
      (f.attacker.id === id && f.attackerTacticalPoints != null) ||
      (f.defender.id === id && f.defenderTacticalPoints != null),
  );

  const totalGamesAsFixed = (allGamesCount ?? []).filter(
    (f) =>
      (f.attacker.id === id && f.attackerFixedPoints != null) ||
      (f.defender.id === id && f.defenderFixedPoints != null),
  );

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

  // VP!

  // -- Wins VP
  const totalVPOnAll = totalGames.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === id
        ? currentValue.attackerAveragePoints
        : currentValue.defenderAveragePoints),
    0,
  );

  const totalTacticalVP = totalGamesAsTactical.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === id
        ? currentValue.attackerTacticalPoints ?? 0
        : currentValue.defenderTacticalPoints ?? 0),
    0,
  );

  const totalFixedVP = totalGamesAsFixed.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === id
        ? currentValue.attackerFixedPoints ?? 0
        : currentValue.defenderFixedPoints ?? 0),
    0,
  );

  const averageSecondaryVPOnTactical = totalTacticalVP / totalGamesAsTactical.length;
  const averageSecondaryVPOnFixed = totalFixedVP / totalGamesAsFixed.length;

  const averageVPOnAll = totalVPOnAll / totalGames.length;

  const totalVPOnWins = totalWins.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === id
        ? currentValue.attackerAveragePoints
        : currentValue.defenderAveragePoints),
    0,
  );

  const averageVPOnWins = totalVPOnWins / totalWins.length;

  const totalVPOnWinsAsAttacker = totalWinsAsAttacker.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const totalVPOnAllAsAttacker = totalGamesAsAttacker.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const averageVPOnAllAsAttacker = totalVPOnAllAsAttacker / totalGamesAsAttacker.length;

  const averageVPOnWinsAsAttacker = totalVPOnWinsAsAttacker / totalWinsAsAttacker.length;

  const totalVPOnWinsAsDefender = totalWinsAsDefender.reduce(
    (accumulator, currentValue) => accumulator + currentValue.defenderAveragePoints,
    0,
  );

  const totalVPOnAllAsDefender = totalGamesAsDefender.reduce(
    (accumulator, currentValue) => accumulator + currentValue.defenderAveragePoints,
    0,
  );

  const averageVPOnAllAsDefender = totalVPOnAllAsDefender / totalGamesAsDefender.length;

  const averageVPOnWinsAsDefender = totalVPOnWinsAsDefender / totalWinsAsDefender.length;

  // -- Losses VP
  const totalVPOnLosses = totalLosses.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === id
        ? currentValue.attackerAveragePoints
        : currentValue.defenderAveragePoints),
    0,
  );

  const averageVPOnLosses = totalVPOnLosses / totalLosses.length;

  const totalVPOnLossesAsAttacker = totalLossesAsAttacker.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const averageVPOnLossesAsAttacker = totalVPOnLossesAsAttacker / totalLossesAsAttacker.length;

  const totalVPOnLossesAsDefender = totalLossesAsDefender.reduce(
    (accumulator, currentValue) => accumulator + currentValue.defenderAveragePoints,
    0,
  );
  const averageVPOnLossesAsDefender = totalVPOnLossesAsDefender / totalLossesAsDefender.length;

  // -- Draws VP
  const totalVPOnDraws = totalDraws.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const averageVPOnDraws = totalVPOnDraws / totalDraws.length;

  const totalVPOnDrawsAsAttacker = totalDrawsAsAttacker.reduce(
    (accumulator, currentValue) => accumulator + currentValue.attackerAveragePoints,
    0,
  );

  const averageVPOnDrawsAsAttacker = totalVPOnDrawsAsAttacker / totalDrawsAsAttacker.length;

  const totalVPOnDrawsAsDefender = totalDrawsAsDefender.reduce(
    (accumulator, currentValue) => accumulator + currentValue.defenderAveragePoints,
    0,
  );

  const averageVPOnDrawsAsDefender = totalVPOnDrawsAsDefender / totalDrawsAsDefender.length;

  return {
    user: existingUser,
    globalRanking: rowNumber,
    games: {
      totalGames: {
        totalGames: totalGames.length,
        totalWins: totalWins.length,
        totalLosses: totalLosses.length,
        totalDraws: totalDraws.length,
        totalGamesAsFixed: totalGamesAsFixed.length,
        totalGamesAsTactical: totalGamesAsTactical.length,
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
    vp: {
      averageSecondaryVPOnTactical: isNaN(averageSecondaryVPOnTactical)
        ? 0
        : averageSecondaryVPOnTactical,
      averageSecondaryVPOnFixed: isNaN(averageSecondaryVPOnFixed) ? 0 : averageSecondaryVPOnFixed,

      averageVPOnAll: isNaN(averageVPOnAll) ? 0 : averageVPOnAll,
      averageVPOnWins: isNaN(averageVPOnWins) ? 0 : averageVPOnWins,
      averageVPOnLosses: isNaN(averageVPOnLosses) ? 0 : averageVPOnLosses,
      averageVPOnAllAsAttacker: isNaN(averageVPOnAllAsAttacker) ? 0 : averageVPOnAllAsAttacker,
      averageVPOnAllAsDefender: isNaN(averageVPOnAllAsDefender) ? 0 : averageVPOnAllAsDefender,
      averageVPOnWinsAsAttacker: isNaN(averageVPOnWinsAsAttacker) ? 0 : averageVPOnWinsAsAttacker,
      averageVPOnWinsAsDefender: isNaN(averageVPOnWinsAsDefender) ? 0 : averageVPOnWinsAsDefender,
      averageVPOnLossesAsAttacker: isNaN(averageVPOnLossesAsAttacker)
        ? 0
        : averageVPOnLossesAsAttacker,
      averageVPOnLossesAsDefender: isNaN(averageVPOnLossesAsDefender)
        ? 0
        : averageVPOnLossesAsDefender,
      averageVPOnDraws: isNaN(averageVPOnDraws) ? 0 : averageVPOnDraws,
      averageVPOnDrawsAsAttacker: isNaN(averageVPOnDrawsAsAttacker)
        ? 0
        : averageVPOnDrawsAsAttacker,
      averageVPOnDrawsAsDefender: isNaN(averageVPOnDrawsAsDefender)
        ? 0
        : averageVPOnDrawsAsDefender,
    },
  };
};
