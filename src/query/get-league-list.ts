import { AppDataSource } from '../data-source';
import { LeagueMember } from '../entity/LeagueMember';

export const getLeagueList = async ({ userId, limit, offset }) => {
  console.log('getLeagueList - info - started');

  const leagueList = await AppDataSource.manager.findAndCount(LeagueMember, {
    where: { user: { id: userId } },
    relations: ['user', 'league', 'league.owner'],
    take: limit,
    skip: offset,
  });

  console.log('getLeagueList - info - success');

  return {
    data: leagueList[0],
    count: leagueList[1],
  };
};
