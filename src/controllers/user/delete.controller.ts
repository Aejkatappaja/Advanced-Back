import { Request, Response } from 'express';
import user_delete_services from '../../database/services/user/delete';
import user_get_services from '../../database/services/user/get';

export const deleteUser = async (
  req: Request & { userId?: string },
  res: Response,
): Promise<Response<string, Record<string, unknown>>> => {
  const { userId } = req;

  if (!userId) {
    return res.status(400).json({ message: 'You need to provide an Id!' });
  }
  try {
    const user = await user_get_services.getUserById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    } else {
      const deleteUser = await user_delete_services.deleteUser(userId);
      if (!deleteUser) {
        return res.status(401).json({ message: 'Error during user deletion process.' });
      } else {
        return res.status(200).json({ message: 'Account successfully deleted!' });
      }
    }
  } catch (error: unknown) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
