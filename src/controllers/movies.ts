import { Request, Response } from 'express';

import { Movie, IMovie } from '../models/movie';
import { CustomError } from '../middlewares/customError';
import { ERRORS } from '../config/constants';

export const getMovies = async (req: Request, res: Response) => {
  const movies: IMovie[] = await Movie.find({});
  res.status(200).json(movies);
};

export const createMovie = async (req: Request, res: Response) => {
  const { title, description, releaseDate, genre } = req.body;

  if (!title || !description || !releaseDate || !genre) {
    throw new CustomError(ERRORS.MISSING_FIELDS, 400);
  }

  const newMovie: IMovie = new Movie({ title, description, releaseDate, genre });

  const savedMovie = await newMovie.save();

  res.status(201).json(savedMovie);
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, releaseDate, genre } = req.body;

  if (!title && !description && !releaseDate && !genre) {
    throw new CustomError(ERRORS.MISSING_FIELDS, 400);
  }

  const updatedFields: Partial<IMovie> = {
    ...(title && { title }),
    ...(description && { description }),
    ...(releaseDate && { releaseDate }),
    ...(genre && { genre }),
  };

  const updatedMovie: IMovie | null = await Movie.findByIdAndUpdate(id, updatedFields, {
    runValidators: true,
    context: 'query',
    new: true,
  });

  if (!updatedMovie) {
    throw new CustomError(ERRORS.MOVIE_NOT_FOUND, 404);
  }
  res.status(200).json(updatedMovie);
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedMovie: IMovie | null = await Movie.findByIdAndDelete(id);

  if (!deletedMovie) {
    throw new CustomError(ERRORS.MOVIE_NOT_FOUND, 404);
  }

  res.status(204).send();
};

export const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const movie: IMovie | null = await Movie.findById(id);

  if (!movie) {
    throw new CustomError(ERRORS.MOVIE_NOT_FOUND, 404);
  }

  res.status(200).json(movie);
};

export const getMoviesByGenreName = async (req: Request, res: Response) => {
  const { genreName } = req.params;

  const genreRegex = new RegExp(genreName, 'i');
  const movies: IMovie[] = await Movie.find({ genre: genreRegex });

  res.status(200).json(movies);
};
