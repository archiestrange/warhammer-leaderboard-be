import { AppDataSource } from '../data-source';
import { Blocked } from '../entity/Blocked';
import { Friend } from '../entity/Friend';
import { FriendRequest } from '../entity/FriendRequest';
import { User } from '../entity/User';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';
import { declineFriendRequest } from './decline-friend-request';
import { removeFriend } from './remove-friend';

export const blockUser = async ({ blockerId, blockeeId }) => {
  const date = getExactTimeFromDate(new Date());
  console.log('blockUser - info - started');
  console.log('blockUser - info - Validating userId already exist...');

  const blocker = await AppDataSource.manager.findOne(User, {
    where: { id: blockerId },
  });

  if (!blocker) {
    console.log('blockUser - warning - Email validation failed. No user found.');
    throw new Error('No user could be found with that userId');
  }

  const blockee = await AppDataSource.manager.findOne(User, {
    where: { id: blockeeId },
  });

  if (!blockee) {
    console.log('blockUser - warning - Email validation failed. No user found.');
    throw new Error('No user could be found with that userId');
  }

  const blockListItem = new Blocked();
  blockListItem.blocker = blocker;
  blockListItem.blockee = blockee;
  blockListItem.date = date;

  await AppDataSource.manager.transaction(async (entityManager) => {
    const friendship = await AppDataSource.manager.findOne(Friend, {
      where: { user: { id: blockerId }, friend: { id: blockeeId } },
    });

    if (friendship) {
      console.log('blockUser - info - removing friendship...');
      await removeFriend({ id: friendship.id });
    }

    const friendshipRequest = await AppDataSource.manager.findOne(FriendRequest, {
      where: [
        { sender: { id: blockerId }, receiver: { id: blockeeId } },
        { sender: { id: blockeeId }, receiver: { id: blockerId } },
      ],
    });

    if (friendshipRequest) {
      await declineFriendRequest({ id: friendshipRequest.id });
    }

    console.log('blockUser - info - Saving new blocked item to database...');
    await entityManager.insert(Blocked, blockListItem);
  });

  return blockListItem;
};
