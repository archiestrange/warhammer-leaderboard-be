import { AppDataSource } from '../data-source';
import { Community } from '../entity/Community';
import { CommunityMember } from '../entity/CommunityMember';
import { User } from '../entity/User';

export const deleteCommunity = async ({ userId, communityId }) => {
  console.log('deleteCommunity - info - started');
  console.log('deleteCommunity - info - Validating user exists...');

  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error('Could not find user');
  }

  const community = await AppDataSource.manager.findOne(Community, {
    where: { owner: { id: userId }, id: communityId },
    relations: { owner: true },
  });

  if (!community) {
    throw new Error('Only the owner of that community can delete it');
  }

  await AppDataSource.manager.transaction(async (entityManager) => {
    await entityManager.delete(CommunityMember, { community: { id: communityId } });
    await entityManager.remove(Community, community);
  });

  console.log('deleteCommunity - success - Community successfully deleted');

  return { id: communityId };
};
