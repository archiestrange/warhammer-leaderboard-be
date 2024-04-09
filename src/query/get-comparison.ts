import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { User } from '../entity/User';

export const getComparison = async ({ user1Id, user1Army, user2Id, user2Army }) => {
  console.log('getComparison - info - started');

  console.log('getComparison - info - Trying to find user with matching id...');
  const existingUser1 = await AppDataSource.manager.findOne(User, {
    where: { id: user1Id },
  });

  console.log('getComparison - info - Trying to find user with matching id...');
  const existingUser2 = await AppDataSource.manager.findOne(User, {
    where: { id: user2Id },
  });

  if (!existingUser1 || !existingUser2) {
    console.log('getComparison - warning - No user found with that id');
    throw new Error('No user could be found with that id');
  }

  const user1AllGames = await AppDataSource.manager.find(Game, {
    where: [
      {
        attacker: { id: user1Id },
        attackerArmy: user1Army,
        attackerHandshake: true,
        defenderHandshake: true,
      },
      {
        defender: { id: user1Id },
        defenderArmy: user1Army,
        attackerHandshake: true,
        defenderHandshake: true,
      },
    ],
    relations: {
      attacker: true,
      defender: true,
    },
  });

  const user2AllGames = await AppDataSource.manager.find(Game, {
    where: [
      {
        attacker: { id: user2Id },
        attackerArmy: user2Army,
        attackerHandshake: true,
        defenderHandshake: true,
      },
      {
        defender: { id: user2Id },
        defenderArmy: user2Army,
        attackerHandshake: true,
        defenderHandshake: true,
      },
    ],
    relations: {
      attacker: true,
      defender: true,
    },
  });

  console.log('getComparison - success - User found!');

  // Totals
  const user1TotalGames = user1AllGames ?? [];
  const user2TotalGames = user2AllGames ?? [];

  const user1TotalGamesAsTactical = (user1TotalGames ?? []).filter(
    (f) =>
      (f.attacker.id === user1Id && f.attackerTacticalPoints != null) ||
      (f.defender.id === user1Id && f.defenderTacticalPoints != null),
  );
  const user2TotalGamesAsTactical = (user2TotalGames ?? []).filter(
    (f) =>
      (f.attacker.id === user2Id && f.attackerTacticalPoints != null) ||
      (f.defender.id === user2Id && f.defenderTacticalPoints != null),
  );

  const user1TotalGamesAsFixed = (user1TotalGames ?? []).filter(
    (f) =>
      (f.attacker.id === user1Id && f.attackerFixedPoints != null) ||
      (f.defender.id === user1Id && f.defenderFixedPoints != null),
  );
  const user2TotalGamesAsFixed = (user2TotalGames ?? []).filter(
    (f) =>
      (f.attacker.id === user2Id && f.attackerFixedPoints != null) ||
      (f.defender.id === user2Id && f.defenderFixedPoints != null),
  );

  const user1TotalWins = (user1TotalGames ?? []).filter((f) => {
    if (f.attacker?.id === user1Id) {
      return f.attackerPoints > f.defenderPoints;
    } else {
      return f.attackerPoints < f.defenderPoints;
    }
  });
  const user2TotalWins = (user2TotalGames ?? []).filter((f) => {
    if (f.attacker?.id === user2Id) {
      return f.attackerPoints > f.defenderPoints;
    } else {
      return f.attackerPoints < f.defenderPoints;
    }
  });

  const user1TotalLosses = (user1TotalGames ?? []).filter((f) => {
    if (f.attacker?.id === user1Id) {
      return f.attackerPoints < f.defenderPoints;
    } else {
      return f.attackerPoints > f.defenderPoints;
    }
  });
  const user2TotalLosses = (user2TotalGames ?? []).filter((f) => {
    if (f.attacker?.id === user2Id) {
      return f.attackerPoints < f.defenderPoints;
    } else {
      return f.attackerPoints > f.defenderPoints;
    }
  });

  const user1TotalDraws = (user1TotalGames ?? []).filter((f) => {
    return f.attackerPoints === f.defenderPoints;
  });
  const user2TotalDraws = (user2TotalGames ?? []).filter((f) => {
    return f.attackerPoints === f.defenderPoints;
  });

  // VP!
  const user1TotalVP = user1TotalGames.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === user1Id
        ? currentValue.attackerAveragePoints
        : currentValue.defenderAveragePoints),
    0,
  );
  const user2TotalVP = user2TotalGames.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === user2Id
        ? currentValue.attackerAveragePoints
        : currentValue.defenderAveragePoints),
    0,
  );

  const user1PrimaryVP = user1TotalGames.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === user1Id
        ? currentValue.attackerAveragePoints -
          (currentValue.attackerFixedPoints ?? 0) -
          (currentValue.attackerTacticalPoints ?? 0)
        : currentValue.defenderAveragePoints -
          (currentValue.defenderFixedPoints ?? 0) -
          (currentValue.defenderTacticalPoints ?? 0)),
    0,
  );
  const user2PrimaryVP = user1TotalGames.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === user1Id
        ? currentValue.attackerAveragePoints -
          (currentValue.attackerFixedPoints ?? 0) -
          (currentValue.attackerTacticalPoints ?? 0)
        : currentValue.defenderAveragePoints -
          (currentValue.defenderFixedPoints ?? 0) -
          (currentValue.defenderTacticalPoints ?? 0)),
    0,
  );

  const user1TotalTacticalVP = user1TotalGamesAsTactical.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === user1Id
        ? currentValue.attackerTacticalPoints ?? 0
        : currentValue.defenderTacticalPoints ?? 0),
    0,
  );
  const user2TotalTacticalVP = user2TotalGamesAsTactical.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === user2Id
        ? currentValue.attackerTacticalPoints ?? 0
        : currentValue.defenderTacticalPoints ?? 0),
    0,
  );

  const user1TotalFixedVP = user1TotalGamesAsFixed.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === user1Id
        ? currentValue.attackerFixedPoints ?? 0
        : currentValue.defenderFixedPoints ?? 0),
    0,
  );
  const user2TotalFixedVP = user2TotalGamesAsFixed.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.attacker?.id === user2Id
        ? currentValue.attackerFixedPoints ?? 0
        : currentValue.defenderFixedPoints ?? 0),
    0,
  );

  const user1AverageVPOnAll = user1TotalVP / (user1AllGames.length || 1);
  const user2AverageVPOnAll = user2TotalVP / (user2AllGames.length || 1);

  const user1AveragePrimaryVPOnAll = user1PrimaryVP / (user1AllGames.length || 1);
  const user2AveragePrimaryVPOnAll = user2PrimaryVP / (user2AllGames.length || 1);

  const user1AverageSecondaryVPOnTactical =
    user1TotalTacticalVP / (user1TotalGamesAsTactical.length || 1);
  const user2AverageSecondaryVPOnTactical =
    user2TotalTacticalVP / (user2TotalGamesAsTactical.length || 1);

  const user1AverageSecondaryVPOnFixed = user1TotalFixedVP / (user1TotalGamesAsFixed.length || 1);
  const user2AverageSecondaryVPOnFixed = user2TotalFixedVP / (user2TotalGamesAsFixed.length || 1);

  const result = {
    user1: existingUser1,
    user2: existingUser2,
    games: {
      user1: {
        totalGames: user1AllGames.length ?? 0,
        totalWins: user1TotalWins.length ?? 0,
        totalLosses: user1TotalLosses.length ?? 0,
        totalDraws: user1TotalDraws.length ?? 0,
      },
      user2: {
        totalGames: user2AllGames.length ?? 0,
        totalWins: user2TotalWins.length ?? 0,
        totalLosses: user2TotalLosses.length ?? 0,
        totalDraws: user2TotalDraws.length ?? 0,
      },
    },
    vp: {
      user1: {
        averageVP: isNaN(user1AverageVPOnAll) ? 0 : user1AverageVPOnAll,
        averagePrimary: isNaN(user1AveragePrimaryVPOnAll) ? 0 : user1AveragePrimaryVPOnAll,
        averagetTactical: isNaN(user1AverageSecondaryVPOnTactical)
          ? 0
          : user1AverageSecondaryVPOnTactical,
        averagetFixed: isNaN(user1AverageSecondaryVPOnFixed) ? 0 : user1AverageSecondaryVPOnFixed,
      },
      user2: {
        averageVP: isNaN(user2AverageVPOnAll) ? 0 : user2AverageVPOnAll,
        averagePrimary: isNaN(user2AveragePrimaryVPOnAll) ? 0 : user2AveragePrimaryVPOnAll,
        averagetTactical: isNaN(user2AverageSecondaryVPOnTactical)
          ? 0
          : user2AverageSecondaryVPOnTactical,
        averagetFixed: isNaN(user2AverageSecondaryVPOnFixed) ? 0 : user2AverageSecondaryVPOnFixed,
      },
    },
  };

  return result;
};
