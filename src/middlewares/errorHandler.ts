import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { MongoServerError } from 'mongodb';

import { ERRORS } from '../config/constants';
import { CustomError } from './customError';

const handleNotFound = (req: Request, res: Response): void => {
  res.status(404).json({ error: ERRORS.NOT_FOUND });
};

const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof MongooseError.CastError || err instanceof MongooseError.ValidationError) {
    return res.status(400).json({ description: ERRORS.VALIDATION_ERROR, error: err.message });
  }

  if (err instanceof MongoServerError && err.code === 11000) {
    return res.status(400).json({ description: ERRORS.DUPLICATE_GENRE_ERROR, error: err.message });
  }

  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(500).json({ error: ERRORS.INTERNAL_SERVER_ERROR });
  next(err);
};

export { handleNotFound, handleErrors };
