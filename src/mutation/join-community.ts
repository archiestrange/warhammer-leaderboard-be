import { AppDataSource } from '../data-source';
import { Community } from '../entity/Community';
import { CommunityMember } from '../entity/CommunityMember';
import { User } from '../entity/User';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';

type Args = { userId: string; communityId: string };

export const joinCommunity = async ({ userId, communityId }: Args) => {
  console.log('createCommunity - info - started');
  console.log('createCommunity - info - Validating user exists...');

  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id: userId },
  });

  if (!existingUser) {
    console.log('createCommunity - warning - no user with that id could be found');
    throw new Error('Could not find user');
  }

  const existingCommunity = await AppDataSource.manager.findOne(Community, {
    where: { id: communityId },
  });

  if (!existingCommunity) {
    console.log('createCommunity - warning - no community with that id could be found');
    throw new Error('Could not find community');
  }

  const existingCommunityMember = await AppDataSource.manager.findOne(CommunityMember, {
    where: { user: { id: userId }, community: { id: communityId } },
  });

  if (existingCommunityMember) {
    console.log('createCommunity - warning - already part of that community');
    throw new Error(`You're already in that community`);
  }

  const communityMember = new CommunityMember();
  communityMember.user = existingUser;
  communityMember.community = existingCommunity;
  communityMember.date = getExactTimeFromDate(new Date());

  console.log('createCommunity - info - Saving new community member item to database...');

  await AppDataSource.manager.insert(CommunityMember, communityMember);

  console.log('createCommunity - success - Community successfully created');

  return communityMember;
};
