import { AppDataSource } from '../data-source';
import { Friend } from '../entity/Friend';

export const removeFriend = async ({ id }) => {
  console.log('removeFriend - info - started');

  console.log('removeFriend - info - finding friendship');
  const friendship = await AppDataSource.manager.findOne(Friend, {
    where: { id },
    relations: ['user', 'friend'],
  });

  await AppDataSource.manager.transaction(async (entityManager) => {
    console.log('removeFriend - info - removing friend item');
    await entityManager.remove(Friend, friendship);

    console.log('removeFriend - info - finding opposing friendship');
    const opposingFriendship = await AppDataSource.manager.findOne(Friend, {
      where: { user: { id: friendship.friend.id } },
      relations: ['user', 'friend'],
    });

    if (opposingFriendship) {
      console.log('removeFriend - info - removing opposing friend item');
      await entityManager.remove(Friend, opposingFriendship);
    }
  });

  console.log('removeFriend - info - successful');

  return id;
};
