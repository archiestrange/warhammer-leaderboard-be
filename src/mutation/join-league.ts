import { AppDataSource } from '../data-source';
import { League } from '../entity/League';
import { LeagueMember } from '../entity/LeagueMember';
import { User } from '../entity/User';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';

type Args = { userId: string; leagueId: string };

export const joinLeague = async ({ userId, leagueId }: Args) => {
  console.log('createLeague - info - started');
  console.log('createLeague - info - Validating user exists...');

  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id: userId },
  });

  if (!existingUser) {
    console.log('createLeague - warning - no user with that id could be found');
    throw new Error('Could not find user');
  }

  const existingLeague = await AppDataSource.manager.findOne(League, {
    where: { id: leagueId },
  });

  if (!existingLeague) {
    console.log('createLeague - warning - no league with that id could be found');
    throw new Error('Could not find league');
  }

  const existingLeagueMember = await AppDataSource.manager.findOne(LeagueMember, {
    where: { user: { id: userId }, league: { id: leagueId } },
  });

  if (existingLeagueMember) {
    console.log('createLeague - warning - already part of that league');
    throw new Error(`You're already in that league`);
  }

  const leagueMember = new LeagueMember();
  leagueMember.user = existingUser;
  leagueMember.league = existingLeague;
  leagueMember.date = getExactTimeFromDate(new Date());

  console.log('createLeague - info - Saving new league member item to database...');

  await AppDataSource.manager.insert(LeagueMember, leagueMember);

  console.log('createLeague - success - League successfully created');

  return leagueMember;
};
