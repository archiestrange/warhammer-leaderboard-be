import { Any, Raw } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Blocked } from '../entity/Blocked';
import { Friend } from '../entity/Friend';
import { FriendRequest } from '../entity/FriendRequest';

export const getSuggestedFriends = async ({ userId, limit, offset }) => {
  console.log('getSuggestedFriends - info - started');
  console.log('getSuggestedFriends - info - finding friends of friends');
  const friendList = await AppDataSource.manager.find(Friend, {
    where: { user: { id: userId } },
    relations: ['user', 'friend'],
  });

  console.log('getSuggestedFriends - info - finding blocked list');
  const blockedList = await AppDataSource.manager.find(Blocked, {
    where: { blocker: { id: userId } },
    relations: ['blocker', 'blockee'],
  });

  console.log('getSuggestedFriends - info - finding blocked list');
  const senderList = await AppDataSource.manager.find(FriendRequest, {
    where: { sender: { id: userId } },
    relations: ['sender', 'receiver'],
  });

  const receiverList = await AppDataSource.manager.find(FriendRequest, {
    where: { receiver: { id: userId } },
    relations: ['sender', 'receiver'],
  });

  const friendIds = friendList.map((m) => m.friend.id);
  const blockedIds = blockedList.map((m) => m.blockee.id);
  const senderIds = senderList.map((m) => m.receiver.id);
  const receiverIds = receiverList.map((m) => m.sender.id);

  const queryOrEmpty = ({ array, query }: { array: string[]; query: string }) => {
    if (!array.length) {
      return '';
    } else {
      return query;
    }
  };

  console.log('getSuggestedFriends - info - finding suggested friends');
  const suggestions = await AppDataSource.manager
    .getRepository(Friend)
    .createQueryBuilder('friendParent')
    .innerJoinAndSelect('friendParent.friend', 'friend')
    .where({
      user: { id: Any(friendIds) },
      friend: {
        id: Raw(
          (friendId) =>
            `${friendId} != ${userId} ${queryOrEmpty({
              array: friendIds,
              query: `AND ${friendId} NOT IN(${friendIds})`,
            })} ${queryOrEmpty({
              array: blockedIds,
              query: `AND ${friendId} NOT IN(${blockedIds})`,
            })} ${queryOrEmpty({
              array: senderIds,
              query: `AND ${friendId} NOT IN(${senderIds})`,
            })} ${queryOrEmpty({
              array: receiverIds,
              query: `AND ${friendId} NOT IN(${receiverIds})`,
            })}`,
        ),
      },
    })
    .distinctOn(['friend.id'])
    .take(limit)
    .skip(offset)
    .getMany();

  console.log('getSuggestedFriends - success');
  return {
    data: suggestions ?? [],
    count: 100,
  };
};
