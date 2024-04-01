import { AppDataSource } from '../data-source';
import { LeagueMember } from '../entity/LeagueMember';

export const getLeagueMembers = async ({ leagueId, limit, offset }) => {
  console.log('getLeague - info - started');

  const leagueMembers = await AppDataSource.manager.findAndCount(LeagueMember, {
    where: { league: { id: leagueId } },
    relations: ['user', 'league', 'league.owner'],
    take: limit,
    skip: offset,
  });

  console.log('getLeague - info - success');

  return {
    data: leagueMembers[0],
    count: leagueMembers[1],
  };
};
