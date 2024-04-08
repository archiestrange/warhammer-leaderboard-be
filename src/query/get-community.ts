import { AppDataSource } from '../data-source';
import { CommunityMember } from '../entity/CommunityMember';

export const getCommunity = async ({ userId, communityId }) => {
  console.log('getCommunity - info - started');

  const community = await AppDataSource.manager.findOne(CommunityMember, {
    where: { user: { id: userId }, community: { id: communityId } },
    relations: ['user', 'community', 'community.owner'],
  });

  console.log('getCommunity - info - success');

  return community;
};
