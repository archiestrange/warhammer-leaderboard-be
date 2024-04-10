import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

type Args = Omit<User, 'id'>;

export const createUser = async ({
  email,
  username,
  password,
  firstName,
  lastName,
  favouriteArmy,
}: Args) => {
  console.log('createUser - info - started');
  console.log('createUser - info - Validating email does not already exist...');

  const userRepository = AppDataSource.manager.getRepository(User);
  const existingEmail = await userRepository
    .createQueryBuilder('user')
    .where('LOWER(user.email) = LOWER(:email)', {
      email: email.toLowerCase(),
    })
    .andWhere('user.password = :password', { password })
    .getOne();

  if (existingEmail) {
    console.log('createUser - warning - Email validation failed. User already exists.');
    throw new Error('A user with that email already exists.');
  }

  const existingUsername = await userRepository
    .createQueryBuilder('user')
    .where('LOWER(user.username) = LOWER(:username)', {
      username: username.toLowerCase(),
    })
    .andWhere('user.password = :password', { password })
    .getOne();

  if (existingUsername) {
    console.log('createUser - warning - Username validation failed. User already exists.');
    throw new Error('That username is already in use');
  }

  console.log('createUser - info - Email validation passed. Email not in use.');
  console.log('createUser - info - Creating new user item.');

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username;
  user.email = email;
  user.password = password;
  user.maxWinStreak = 0;
  user.winStreak = 0;
  user.favouriteArmy = favouriteArmy;

  console.log('createUser - info - Saving new user item to database...');
  await AppDataSource.manager.insert(User, user);

  console.log('createUser - success - User successfully created');

  return user;
};
