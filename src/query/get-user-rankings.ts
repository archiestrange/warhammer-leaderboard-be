import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const getUserRankings = async ({ limit, offset }) => {
  console.log('getUserRankings - info - started');

  const leagueMembers = await AppDataSource.manager.findAndCount(User, {
    take: limit,
    skip: offset,
    order: {
      globalRanking: 'DESC',
    },
  });

  console.log('getUserRankings - info - success');

  return {
    data: leagueMembers[0],
    count: leagueMembers[1],
  };
};
