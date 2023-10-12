import { Request, Response } from 'express';

const getHome = (req: Request, res: Response) => {
  res.send('<h1 style="font-weight: bold;">Node.JS Practice</h1>');
};

export { getHome as homeController };
