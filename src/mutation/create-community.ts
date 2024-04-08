import { AppDataSource } from '../data-source';
import { Community } from '../entity/Community';
import { CommunityMember } from '../entity/CommunityMember';
import { User } from '../entity/User';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';

type Args = { userId: string; name: string; isPrivate: boolean };

export const createCommunity = async ({ userId, isPrivate, name }: Args) => {
  console.log('createCommunity - info - started');
  console.log('createCommunity - info - Validating user exists...');

  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id: userId },
  });

  if (!existingUser) {
    console.log('createCommunity - warning - no user with that id could be found');
    throw new Error('Could not find user');
  }

  console.log('createCommunity - info - Creating new community item.');

  const community = new Community();
  community.owner = existingUser;
  community.private = isPrivate;
  community.name = name;
  community.date = getExactTimeFromDate(new Date());

  console.log('createCommunity - info - Saving new community item to database...');

  await AppDataSource.manager.insert(Community, community);

  console.log('createCommunity - info - Creating new community member item.');

  const communityMember = new CommunityMember();
  communityMember.user = existingUser;
  communityMember.community = community;
  communityMember.date = getExactTimeFromDate(new Date());

  console.log('createCommunity - info - Saving new community member item to database...');

  await AppDataSource.manager.insert(CommunityMember, communityMember);

  console.log('createCommunity - success - Community successfully created');

  return community;
};
