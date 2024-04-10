import { Raw } from 'typeorm';

import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

type Args = Omit<User, 'id'>;

export const signIn = async ({ email, password }: Args) => {
  console.log('signIn - info - started');
  console.log('signIn - info - Validating email does not already exist...');

  const userRepository = AppDataSource.manager.getRepository(User);

  const user = await userRepository
    .createQueryBuilder('user')
    .where('LOWER(user.email) = LOWER(:email) OR LOWER(user.username) = LOWER(:email)', {
      email: email.toLowerCase(),
    });

  if (!user) {
    console.log('signIn - warning - User could not be found with that email password combo.');
    throw new Error('No user with that email or username exists.');
  }

  const authUser = await userRepository
    .createQueryBuilder('user')
    .where('LOWER(user.email) = LOWER(:email) OR LOWER(user.username) = LOWER(:email)', {
      email: email.toLowerCase(),
    })
    .andWhere('user.password = :password', { password })
    .getOne();

  if (!authUser) {
    console.log('signIn - warning - User could not be found with that email password combo.');
    throw new Error('Incorrect password.');
  }

  return authUser;
};
