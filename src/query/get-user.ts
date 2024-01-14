import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

type Args = Pick<User, 'id'>;

export const getUser = async ({ id }: Args): Promise<User> => {
  console.log('getUser - info - started');

  console.log('getUser - info - Trying to find user with matching id...');
  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id },
  });

  if (!existingUser) {
    console.log('getUser - warning - No user found with that id');
    throw new Error('No user could be found with that id');
  }

  console.log('getUser - success - User found!');
  return existingUser;
};
