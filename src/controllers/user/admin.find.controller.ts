import { Request, Response } from 'express';
import { IUser } from '../../types/user.type';
import user_get_services from '../../database/services/user/get';

export const adminGetUser = async (req: Request, res: Response): Promise<Response<IUser, Record<string, unknown>>> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Error about provided userId' });
    }

    const user = await user_get_services.getUserById(id);
    if (user) {
      return res.status(201).json(user);
    } else return res.status(400).json({ message: 'Error during fetch user informations process!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
