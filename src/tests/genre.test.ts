import supertest from 'supertest';
import mongoose from 'mongoose';

import app from '../server';
import * as db from './db';
import { ERRORS } from '../config/constants';

const request = supertest(app);

describe('Genre Tests', () => {
  beforeAll(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.closeDatabase();
  });

  describe('getGenres', () => {
    it('should get a list of genres', async () => {
      await request.post('/genres').send({ name: 'Sci-Fi' });
      await request.post('/genres').send({ name: 'Fantasy' });

      const response = await request.get('/genres');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });

    it('should get a genre by ID', async () => {
      const genre = await request.post('/genres').send({ name: 'Science Fiction' });

      const response = await request.get(`/genres/${genre.body._id}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(genre.body._id);
      expect(response.body.name).toBe(genre.body.name);
    });

    it('should fail fetching for non-existent genre', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request.get(`/genres/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(ERRORS.GENRE_NOT_FOUND);
    });
  });

  describe('createGenre', () => {
    it('should create a new genre', async () => {
      const newGenre = {
        name: 'DJ',
      };

      const response = await request.post('/genres').send(newGenre);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(newGenre.name);
    });

    it('should fail creation when name is not provided', async () => {
      const response = await request.post('/genres').send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(ERRORS.REQUIRED_NAME);
    });

    it('should fail validation for an invalid genre during creation', async () => {
      const newGenre = {
        name: 'O',
      };

      const response = await request.post('/genres').send(newGenre);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain(ERRORS.NAME_LENGTH);
    });

    it('should fail creation for duplicate genres with different cases', async () => {
      const genreName = 'Action';

      const firstResponse = await request.post('/genres').send({ name: genreName });

      expect(firstResponse.status).toBe(201);

      const secondResponse = await request.post('/genres').send({ name: genreName.toLowerCase() });

      expect(secondResponse.status).toBe(400);
      expect(secondResponse.body.description).toBe(ERRORS.DUPLICATE_GENRE_ERROR);
    });
  });

  describe('updateGenre', () => {
    it('should update an existing genre', async () => {
      const genre = await request.post('/genres').send({ name: 'Action' });

      const updatedResponse = await request
        .put(`/genres/${genre.body._id}`)
        .send({ name: 'Updated Action' });

      expect(updatedResponse.status).toBe(200);
      expect(updatedResponse.body._id).toBe(genre.body._id);
      expect(updatedResponse.body.name).toBe('Updated Action');
    });

    it('should fail update when name is not provided', async () => {
      const genre = await request.post('/genres').send({ name: 'Action' });

      const response = await request.put(`/genres/${genre.body._id}`).send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe(ERRORS.REQUIRED_NAME);
    });

    it('should fail update for non-existent genre', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request
        .put(`/genres/${nonExistentId}`)
        .send({ name: 'Updated Genre' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(ERRORS.GENRE_NOT_FOUND);
    });
  });

  describe('deleteGenre', () => {
    it('should delete an existing genre', async () => {
      const genre = await request.post('/genres').send({ name: 'Thriller' });

      const response = await request.delete(`/genres/${genre.body._id}`);

      expect(response.status).toBe(204);

      const getResponse = await request.get(`/genres/${genre.body._id}`);
      expect(getResponse.status).toBe(404);
    });

    it('should fail deletion for non-existent genre', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const response = await request.delete(`/genres/${nonExistentId}`);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe(ERRORS.GENRE_NOT_FOUND);
    });
  });
});
