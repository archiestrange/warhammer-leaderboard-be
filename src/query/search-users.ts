import { FindOptionsWhere, ILike, Like } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const searchUsers = async ({
  email,
  firstname,
  lastname,
}: {
  email: string;
  firstname: string;
  lastname: string;
}) => {
  console.log('searchUsers - info - started');

  if (!email && !firstname && !lastname) {
    return [];
  }

  const friendList = await AppDataSource.manager.find(User, {
    where: {
      ...(email && { email: ILike(`%${email}%`) }),
      ...(firstname && { firstName: ILike(`%${firstname}%`) }),
      ...(lastname && { lastName: ILike(`%${lastname}%`) }),
    },
  });

  console.log('searchUsers - info - success');

  return friendList;
};
