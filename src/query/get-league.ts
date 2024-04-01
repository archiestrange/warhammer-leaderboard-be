import { AppDataSource } from '../data-source';
import { LeagueMember } from '../entity/LeagueMember';

export const getLeague = async ({ userId, leagueId }) => {
  console.log('getLeague - info - started');

  const league = await AppDataSource.manager.findOne(LeagueMember, {
    where: { user: { id: userId }, league: { id: leagueId } },
    relations: ['user', 'league', 'league.owner'],
  });

  console.log('getLeague - info - success');

  return league;
};
