import { AppDataSource } from '../data-source';
import { League } from '../entity/League';
import { LeagueMember } from '../entity/LeagueMember';
import { User } from '../entity/User';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';

type Args = { userId: string; name: string; isPrivate: boolean };

export const createLeague = async ({ userId, isPrivate, name }: Args) => {
  console.log('createLeague - info - started');
  console.log('createLeague - info - Validating user exists...');

  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id: userId },
  });

  if (!existingUser) {
    console.log('createLeague - warning - no user with that id could be found');
    throw new Error('Could not find user');
  }

  console.log('createLeague - info - Creating new league item.');

  const league = new League();
  league.owner = existingUser;
  league.private = isPrivate;
  league.name = name;
  league.date = getExactTimeFromDate(new Date());

  console.log('createLeague - info - Saving new league item to database...');

  await AppDataSource.manager.insert(League, league);

  console.log('createLeague - info - Creating new league member item.');

  const leagueMember = new LeagueMember();
  leagueMember.user = existingUser;
  leagueMember.league = league;
  leagueMember.date = getExactTimeFromDate(new Date());

  console.log('createLeague - info - Saving new league member item to database...');

  await AppDataSource.manager.insert(LeagueMember, leagueMember);

  console.log('createLeague - success - League successfully created');

  return league;
};
