import { Request, Response } from 'express';
import usersData from '../data/users';

export const getUsers = (req: Request, res: Response): void => {
  res.json(usersData);
};
