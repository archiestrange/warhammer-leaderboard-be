import { AppDataSource } from '../data-source';
import { CommunityMember } from '../entity/CommunityMember';

export const getCommunity = async ({ userId, communityId }) => {
  console.log('getCommunity - info - started');

  const community = await AppDataSource.manager.findOne(CommunityMember, {
    where: { community: { id: communityId } },
    relations: ['user', 'community', 'community.owner'],
  });

  const isMember = await AppDataSource.manager.findOne(CommunityMember, {
    where: { user: { id: userId } },
    relations: ['user', 'community', 'community.owner'],
  });

  console.log('getCommunity - info - success');

  return {
    ...community,
    isMember: Boolean(isMember),
  };
};
