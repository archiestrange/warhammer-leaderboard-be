import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

type Args = Omit<User, 'id'>;

export const signIn = async ({ email, password }: Args) => {
  console.log('signIn - info - started');
  console.log('signIn - info - Validating email does not already exist...');

  const user = await AppDataSource.manager.findOne(User, {
    where: [
      { email: email, password },
      { username: email, password },
    ],
  });

  if (!user) {
    console.log('signIn - warning - User could not be found with that email password combo.');
    throw new Error('User not found.');
  }

  return user;
};
