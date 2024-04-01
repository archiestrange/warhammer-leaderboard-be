import { AppDataSource } from '../data-source';
import { FriendRequest } from '../entity/FriendRequest';

export const declineFriendRequest = async ({ id }) => {
  console.log('declineFriendRequest - info - started');

  const request = await AppDataSource.manager.findOne(FriendRequest, {
    where: { id },
  });

  await AppDataSource.manager.transaction(async (entityManager) => {
    console.log(
      'declineFriendRequest - info - removing notifications associated to friend request',
    );
    console.log('declineFriendRequest - info - remove friend request item');
    await entityManager.remove(FriendRequest, request);
  });

  console.log('declineFriendRequest - info - successful');

  return id;
};
