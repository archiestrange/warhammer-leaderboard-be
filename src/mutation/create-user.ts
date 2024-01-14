import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

type Args = Omit<User, 'id'>;

export const createUser = async ({ email, password, firstName, lastName }: Args) => {
  console.log('createUser - info - started');
  console.log('createUser - info - Validating email does not already exist...');

  const existingEmail = await AppDataSource.manager.findOne(User, {
    where: { email: email.toLowerCase() },
  });

  if (existingEmail) {
    console.log('createUser - warning - Email validation failed. User already exists.');
    throw new Error('A user with that email already exists.');
  }

  console.log('createUser - info - Email validation passed. Email not in use.');
  console.log('createUser - info - Creating new user item.');

  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email.toLowerCase();
  user.password = password;

  console.log('createUser - info - Saving new user item to database...');
  await AppDataSource.manager.insert(User, user);

  console.log('createUser - success - User successfully created');

  return user;
};
