import { AppDataSource } from '../data-source';
import { CommunityMember } from '../entity/CommunityMember';

export const getCommunityMembers = async ({ communityId, limit, offset }) => {
  console.log('getCommunity - info - started');

  const communityMembers = await AppDataSource.manager.findAndCount(CommunityMember, {
    where: { community: { id: communityId } },
    relations: ['user', 'community', 'community.owner'],
    take: limit,
    skip: offset,
    order: {
      user: {
        globalRanking: 'DESC',
      },
      date: 'ASC',
    },
  });

  console.log('getCommunity - info - success');

  return {
    data: communityMembers[0],
    count: communityMembers[1],
  };
};
