import config from '../configs/env.config';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../database/models/user.model';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { SECRET } = config;
    const token = req.headers.authorization;
    if (!token) {
      return;
    }

    const accessToken = token.split(' ')[1];

    jwt.verify(accessToken, SECRET, async (err, decoded: JwtPayload | string): Promise<NextFunction | Response> => {
      if (err) {
        return res.status(401).json({ message: 'Token is invalid' });
      }

      if (typeof decoded === 'string') {
        return;
      } else {
        const user = await User.findById((decoded as JwtPayload).id);

        // if (user) {
        //   req.user = user;
        // }

        if (user.role !== 'Admin') {
          return res.status(403).json({ message: 'Insufficient permissions' });
        }
      }

      next();
    });
  } catch (error: unknown) {
    console.error('error on credentials checking process', error);
    throw error;
  }
};
