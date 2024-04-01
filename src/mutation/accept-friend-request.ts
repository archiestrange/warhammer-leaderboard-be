import { AppDataSource } from '../data-source';
import { Friend } from '../entity/Friend';
import { FriendRequest } from '../entity/FriendRequest';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';

export const acceptFriendRequest = async ({ id }) => {
  console.log('acceptFriendRequest - info - started');

  const request = await AppDataSource.manager.findOne(FriendRequest, {
    where: { id },
    relations: ['sender', 'receiver'],
  });

  const newRequester = new Friend();
  newRequester.user = request.sender;
  newRequester.friend = request.receiver;
  newRequester.date = getExactTimeFromDate(new Date());

  const newReceiver = new Friend();
  newReceiver.user = request.receiver;
  newReceiver.friend = request.sender;
  newReceiver.date = getExactTimeFromDate(new Date());

  await AppDataSource.manager.transaction(async (entityManager) => {
    console.log('acceptFriendRequest - info - saving new friend list item for receiver');
    await entityManager.insert(Friend, newReceiver);
    console.log('acceptFriendRequest - info - removing friend request item');
    await entityManager.remove(FriendRequest, request);
  });

  console.log('acceptFriendRequest - info - successful');

  return newReceiver;
};
