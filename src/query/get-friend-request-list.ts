import { AppDataSource } from '../data-source';
import { FriendRequest } from '../entity/FriendRequest';

export const getFriendRequestList = async ({ userId, limit, offset }) => {
  console.log('getFriendRequestList - info - started');

  const friendRequestList = await AppDataSource.manager.findAndCount(FriendRequest, {
    where: { receiver: { id: userId } },
    relations: ['sender', 'receiver'],
    take: limit,
    skip: offset,
  });

  return {
    data: friendRequestList[0],
    count: friendRequestList[1],
  };
};
