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

  const existingEmail = await AppDataSource.manager.findOne(User, {
    where: { email: email },
  });

  if (existingEmail) {
    console.log('createUser - warning - Email validation failed. User already exists.');
    throw new Error('A user with that email already exists.');
  }
  const existingUsername = await AppDataSource.manager.findOne(User, {
    where: { username: username },
  });

  if (existingUsername) {
    console.log('createUser - warning - Username validation failed. User already exists.');
    throw new Error('That username is already in use');
  }

  console.log('createUser - info - Email validation passed. Email not in use.');
  console.log('createUser - info - Creating new user item.');

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.username = username.toLowerCase();
  user.email = email.toLowerCase();
  user.password = password;
  user.maxWinStreak = 0;
  user.winStreak = 0;
  user.favouriteArmy = favouriteArmy;

  console.log('createUser - info - Saving new user item to database...');
  await AppDataSource.manager.insert(User, user);

  console.log('createUser - success - User successfully created');

  return user;
};
