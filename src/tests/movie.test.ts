import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../server';
import * as db from './db';
import { ERRORS } from '../config/constants';

const request = supertest(app);

describe('Movie Tests', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  describe('getMovies', () => {
    it('should get a list of movies', async () => {
      const responseGenre1 = await request.post('/genres').send({ name: 'Action' });
      const responseGenre2 = await request.post('/genres').send({ name: 'Sci-Fi' });
      const responseGenre3 = await request.post('/genres').send({ name: 'Drama' });

      await request.post('/movies').send({
        title: 'Inception',
        description: 'A mind-bending movie',
        releaseDate: '2022-01-01',
        genre: [responseGenre1.body.name, responseGenre2.body.name],
      });
      await request.post('/movies').send({
        title: 'The Shawshank Redemption',
        description: 'A classic movie',
        releaseDate: '2022-01-02',
        genre: [responseGenre3.body.name],
      });

      const response = await request.get('/movies');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it('should get a movie by ID', async () => {
      const responseGenre1 = await request.post('/genres').send({ name: 'Action' });
      const responseGenre2 = await request.post('/genres').send({ name: 'Crime' });

      const movie = await request.post('/movies').send({
        title: 'The Dark Knight',
        description: 'A superhero movie',
        releaseDate: '2022-01-03',
        genre: [responseGenre1.body.name, responseGenre2.body.name],
      });

      const response = await request.get(`/movies/${movie.body._id}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(movie.body._id);
      expect(response.body.title).toBe(movie.body.title);
    });

    it('should fail fetching for non-existent movie', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request.get(`/movies/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(ERRORS.MOVIE_NOT_FOUND);
    });
  });

  describe('createMovie', () => {
    it('should create a new movie', async () => {
      const responseGenre1 = await request.post('/genres').send({ name: 'Action' });
      const responseGenre2 = await request.post('/genres').send({ name: 'Sci-Fi' });

      const newMovie = {
        title: 'The Matrix',
        description: 'A classic sci-fi movie',
        releaseDate: '1999-03-31',
        genre: [responseGenre1.body.name, responseGenre2.body.name],
      };

      const response = await request.post('/movies').send(newMovie);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(newMovie.title);
    });

    it('should fail creation when release date is not provided', async () => {
      const responseGenre = await request.post('/genres').send({ name: 'Action' });

      const newMovie = {
        title: 'Incomplete Movie',
        description: 'A movie without a release date',
        genre: [responseGenre.body.name],
      };

      const response = await request.post('/movies').send(newMovie);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(ERRORS.MISSING_FIELDS);
    });

    it('should fail creation for invalid genre', async () => {
      await request.post('/genres').send({ name: 'Action' });

      const newMovie = {
        title: 'Invalid Movie',
        description: 'A movie with an invalid genre',
        releaseDate: '2022-01-01',
        genre: ['NonExistentGenre'],
      };

      const response = await request.post('/movies').send(newMovie);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain(ERRORS.INVALID_GENRES);
    });

    it('should fail creation when description has less than 7 characters', async () => {
      const responseGenre = await request.post('/genres').send({ name: 'Action' });

      const newMovie = {
        title: 'Incomplete Movie',
        description: 'ShortD',
        releaseDate: '2022-01-01',
        genre: [responseGenre.body.name],
      };

      const response = await request.post('/movies').send(newMovie);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain(ERRORS.INVALID_DESCRIPTION_LENGTH);
    });
  });

  describe('updateMovie', () => {
    it('should update an existing movie', async () => {
      const responseGenre1 = await request.post('/genres').send({ name: 'Action' });
      const responseGenre2 = await request.post('/genres').send({ name: 'Sci-Fi' });

      const movie = await request.post('/movies').send({
        title: 'Inception',
        description: 'A mind-bending movie',
        releaseDate: '2010-07-16',
        genre: [responseGenre1.body.name, responseGenre2.body.name],
      });

      const updatedResponse = await request
        .put(`/movies/${movie.body._id}`)
        .send({ title: 'Inception 2.0' });

      expect(updatedResponse.status).toBe(200);
      expect(updatedResponse.body._id).toBe(movie.body._id);
      expect(updatedResponse.body.title).toBe('Inception 2.0');
    });

    it('should fail update when no fields are provided', async () => {
      const responseGenre = await request.post('/genres').send({ name: 'Drama' });

      const movie = await request.post('/movies').send({
        title: 'The Shawshank Redemption',
        description: 'Classic',
        releaseDate: '1994-09-10',
        genre: [responseGenre.body.name],
      });

      const response = await request.put(`/movies/${movie.body._id}`).send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(ERRORS.MISSING_FIELDS);
    });

    it('should fail update for non-existent movie', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request
        .put(`/movies/${nonExistentId}`)
        .send({ title: 'Updated Movie' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(ERRORS.MOVIE_NOT_FOUND);
    });
  });

  describe('deleteMovie', () => {
    it('should delete an existing movie', async () => {
      const responseGenre = await request.post('/genres').send({ name: 'Fantasy' });

      const movie = await request.post('/movies').send({
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        description: 'A fantasy adventure',
        releaseDate: '2001-12-19',
        genre: [responseGenre.body.name],
      });

      const response = await request.delete(`/movies/${movie.body._id}`);

      expect(response.status).toBe(204);

      const getResponse = await request.get(`/movies/${movie.body._id}`);
      expect(getResponse.status).toBe(404);
    });

    it('should fail deletion for non-existent movie', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request.delete(`/movies/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(ERRORS.MOVIE_NOT_FOUND);
    });
  });

  describe('getMoviesByGenreName', () => {
    it('should get a list of movies by genre name', async () => {
      const responseGenre1 = await request.post('/genres').send({ name: 'Adventure' });
      const responseGenre2 = await request.post('/genres').send({ name: 'Sci-Fi' });
      const responseGenre3 = await request.post('/genres').send({ name: 'Drama' });

      await request.post('/movies').send({
        title: 'The Martian',
        description: 'A sci-fi survival movie',
        releaseDate: '2015-09-30',
        genre: [responseGenre2.body.name, responseGenre1.body.name],
      });
      await request.post('/movies').send({
        title: 'Interstellar',
        description: 'A space exploration movie',
        releaseDate: '2014-11-07',
        genre: [responseGenre2.body.name],
      });
      await request.post('/movies').send({
        title: 'The Revenant',
        description: 'A survival drama',
        releaseDate: '2015-12-25',
        genre: [responseGenre3.body.name, responseGenre1.body.name],
      });

      const response = await request.get('/movies/genre/Adventure');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it('should return an empty array for non-existent genre name', async () => {
      const responseGenre = await request.post('/genres').send({ name: 'Sci-Fi' });
      await request.post('/movies').send({
        title: 'Interstellar',
        description: 'A space exploration movie',
        releaseDate: '2014-11-07',
        genre: [responseGenre.body.name],
      });

      const nonExistentGenreName = 'NonExistentGenre';
      const response = await request.get(`/movies/genre/${nonExistentGenreName}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
});
