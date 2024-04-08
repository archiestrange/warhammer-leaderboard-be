import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export const updateUser = async ({
  id,
  currentPassword,
  newPassword,
  newFirstName,
  newLastName,
  newFavouriteArmy,
}) => {
  console.log('updateUser - info - started');
  console.log('updateUser - info - Validating email does not already exist...');

  const existingUser = await AppDataSource.manager.findOne(User, {
    where: { id },
  });

  if (!existingUser) {
    throw new Error('Unable to find a user with that ID');
  }

  if (newPassword && existingUser.password !== currentPassword) {
    throw new Error('The password you entered is incorrect');
  }

  const updateValues = {
    ...(newPassword && { password: newPassword }),
    ...(newFirstName && { firstName: newFirstName }),
    ...(newLastName && { lastName: newLastName }),
    ...(newFavouriteArmy && { favouriteArmy: newFavouriteArmy }),
  };

  await AppDataSource.manager.update(User, { id }, updateValues);

  return {
    ...existingUser,
    ...updateValues,
  };
};
