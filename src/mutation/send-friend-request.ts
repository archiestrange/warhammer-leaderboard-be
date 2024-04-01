import { AppDataSource } from '../data-source';
import { Blocked } from '../entity/Blocked';
import { Friend } from '../entity/Friend';
import { FriendRequest } from '../entity/FriendRequest';
import { User } from '../entity/User';
import { getExactTimeFromDate } from '../utils/get-exact-time-from-date';

export const sendFriendRequest = async ({ senderUserId, receiverUserId }) => {
  console.log('sendFriendRequest - info - started');

  if (senderUserId === receiverUserId) {
    throw new Error("You can't add yourself!");
  }

  const sender = await AppDataSource.manager.findOne(User, {
    where: { id: senderUserId },
  });

  const receiver = await AppDataSource.manager.findOne(User, {
    where: { id: receiverUserId },
  });

  const youSentRequest = await AppDataSource.manager.findOne(FriendRequest, {
    where: { sender: { id: senderUserId }, receiver: { id: receiverUserId } },
  });

  if (youSentRequest) {
    throw new Error('You have already sent a request to this person!');
  }

  const theySentRequest = await AppDataSource.manager.findOne(FriendRequest, {
    where: { sender: { id: receiverUserId }, receiver: { id: senderUserId } },
  });

  if (theySentRequest) {
    throw new Error(
      'This person has already sent you a request! Go and accept their request in the Requests tab.',
    );
  }

  const existingFriendship = await AppDataSource.manager.findOne(Friend, {
    where: [{ user: { id: senderUserId }, friend: { id: receiverUserId } }],
  });

  if (existingFriendship) {
    throw new Error('This person is already your friend');
  }

  const blocked = await AppDataSource.manager.findOne(Blocked, {
    where: [
      { blocker: { id: senderUserId }, blockee: { id: receiverUserId } },
      { blocker: { id: receiverUserId }, blockee: { id: senderUserId } },
    ],
  });

  if (blocked) {
    throw new Error('This person is blocked');
  }

  const newRequest = new FriendRequest();
  newRequest.sender = sender;
  newRequest.receiver = receiver;
  newRequest.date = getExactTimeFromDate(new Date());

  await AppDataSource.manager.transaction(async (entityManager) => {
    await entityManager.insert(FriendRequest, newRequest);
  });

  return newRequest.id;
};
