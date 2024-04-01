import { ILike, Not } from 'typeorm';

import { AppDataSource } from '../data-source';
import { League } from '../entity/League';

export const searchLeagues = async ({ userId, name }: { userId: string; name: string }) => {
  console.log('searchLeagues - info - started');

  if (!name) {
    return [];
  }

  const leaguesList = await AppDataSource.manager.find(League, {
    where: {
      // owner: { id: Not(userId) },
      name: ILike(`%${name}%`),
    },
    relations: ['owner'],
  });

  console.log('searchLeagues - info - success');

  return leaguesList ?? [];
};
