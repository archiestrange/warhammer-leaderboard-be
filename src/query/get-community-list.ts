import { AppDataSource } from '../data-source';
import { CommunityMember } from '../entity/CommunityMember';

export const getCommunityList = async ({ userId, limit, offset }) => {
  console.log('getCommunityList - info - started');

  const communityList = await AppDataSource.manager.findAndCount(CommunityMember, {
    where: { user: { id: userId } },
    relations: ['user', 'community', 'community.owner'],
    take: limit,
    skip: offset,
  });

  console.log('getCommunityList - info - success');

  return {
    data: communityList[0],
    count: communityList[1],
  };
};
