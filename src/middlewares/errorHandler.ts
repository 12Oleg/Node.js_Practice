import { Request, Response } from 'express';

import { ERRORS } from '../config/constants';

const handleNotFound = (req: Request, res: Response): void => {
  res.status(404).json({ error: ERRORS.NOT_FOUND });
};

const handleInternalServerError = (err: Error, req: Request, res: Response): void => {
  console.error(err.stack);
  res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR });
};

export { handleNotFound, handleInternalServerError };
