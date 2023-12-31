import User from '../../../models/user.model';
import { IUser } from '../../../../types/user.type';

export const getUserById = async (id: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(id).select('-createdAt -__v -password -_id');
    if (user) {
      return user;
    } else return null;
  } catch (error: unknown) {
    console.error('Error during fetching productId process :', error);
    throw error;
  }
};
