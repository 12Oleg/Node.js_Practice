import { Request, Response } from 'express';

import { Genre, IGenre } from '../models/genre';
import { CustomError } from '../middlewares/customError';
import { ERRORS } from '../config/constants';

export const getGenres = async (req: Request, res: Response) => {
  const genres: IGenre[] = await Genre.find({});
  res.status(200).json(genres);
};

export const updateGenre = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new CustomError(ERRORS.REQUIRED_NAME, 400);
  }

  const updatedGenre: IGenre | null = await Genre.findByIdAndUpdate(
    id,
    { name },
    { runValidators: true, context: 'query', new: true },
  );

  if (!updatedGenre) {
    throw new CustomError(ERRORS.GENRE_NOT_FOUND, 404);
  }
  res.status(200).json(updatedGenre);
};

export const createGenre = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    throw new CustomError(ERRORS.REQUIRED_NAME, 400);
  }

  const newGenre: IGenre = new Genre({ name });

  const savedGenre = await newGenre.save();
  res.status(201).json(savedGenre);
};

export const deleteGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedGenre: IGenre | null = await Genre.findByIdAndDelete(id);

  if (!deletedGenre) {
    throw new CustomError(ERRORS.GENRE_NOT_FOUND, 404);
  }

  res.status(204).send();
};

export const getGenreById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre: IGenre | null = await Genre.findById(id);

  if (!genre) {
    throw new CustomError(ERRORS.GENRE_NOT_FOUND, 404);
  }

  res.status(200).json(genre);
};
