import { ILike, Not } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Community } from '../entity/Community';

export const searchCommunities = async ({ name }: { name: string }) => {
  console.log('searchCommunities - info - started');

  if (!name) {
    return [];
  }

  const leaguesList = await AppDataSource.manager.find(Community, {
    where: {
      // owner: { id: Not(userId) },
      name: ILike(`%${name}%`),
    },
    relations: ['owner'],
  });

  console.log('searchCommunities - info - success');

  return leaguesList ?? [];
};
