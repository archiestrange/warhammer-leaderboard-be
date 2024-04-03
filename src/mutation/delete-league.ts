import { AppDataSource } from '../data-source';
import { Game } from '../entity/Game';
import { League } from '../entity/League';
import { LeagueMember } from '../entity/LeagueMember';
import { User } from '../entity/User';

export const deleteLeague = async ({ userId, leagueId }) => {
  console.log('deleteLeague - info - started');
  console.log('deleteLeague - info - Validating user exists...');

  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error('Could not find user');
  }

  const league = await AppDataSource.manager.findOne(League, {
    where: { owner: { id: userId }, id: leagueId },
    relations: { owner: true },
  });

  if (!league) {
    throw new Error('Only the owner of that league can delete it');
  }

  await AppDataSource.manager.transaction(async (entityManager) => {
    await entityManager.delete(LeagueMember, { league: { id: leagueId } });
    await entityManager.update(Game, { league: { id: leagueId } }, { league: null });
    await entityManager.remove(League, league);
  });

  console.log('deleteLeague - success - League successfully deleted');

  return { id: leagueId };
};
