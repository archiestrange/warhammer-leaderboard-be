import { AppDataSource } from '../data-source';
import { Friend } from '../entity/Friend';

export const getFriendList = async ({ userId, limit, offset }) => {
  console.log('getFriendList - info - started');

  const friendList = await AppDataSource.manager.findAndCount(Friend, {
    where: [{ user: { id: userId } }],
    relations: ['user', 'friend'],
    take: limit,
    skip: offset,
  });

  console.log('getFriendList - info - success');

  return {
    data: friendList[0],
    count: friendList[1],
  };
};
