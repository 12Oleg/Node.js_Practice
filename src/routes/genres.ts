import express, { Router } from 'express';

import {
  createGenre,
  deleteGenre,
  getGenreById,
  getGenres,
  updateGenre,
} from '../controllers/genres';

const genresRouter: Router = express.Router();

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Get a list of genres.
 *     description: Returns a list of genres as an array of objects.
 *     tags:
 *      - Genres
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of genre objects.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 */
genresRouter.get('/', getGenres);

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     summary: Update genre by ID
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre to update.
 *     requestBody:
 *       description: Updated genre object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name for the genre.
 *     responses:
 *       200:
 *         description: Successful request. Returns the updated genre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         $ref: '#/components/responses/CustomOrValidationError'
 *       404:
 *          $ref: '#/components/responses/GenreNotFound'
 */

genresRouter.put('/:id', updateGenre);

/**
 * @swagger
 * /genres:
 *   post:
 *     summary: Create a new genre.
 *     tags:
 *       - Genres
 *     requestBody:
 *       description: Genre object to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the genre.
 *     responses:
 *       201:
 *         description: Successful creation of the genre. Returns the created genre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *         $ref: '#/components/responses/CustomOrValidationError'
 */
genresRouter.post('/', createGenre);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     summary: Delete genre by ID
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre to delete.
 *     responses:
 *       204:
 *         description: Successful deletion. No content returned.
 *       400:
 *          $ref: '#/components/responses/ValidationError'
 *       404:
 *          $ref: '#/components/responses/GenreNotFound'
 */
genresRouter.delete('/:id', deleteGenre);

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     tags:
 *       - Genres
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre to get.
 *     responses:
 *       200:
 *         description: Successful response. Returns the genre object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       400:
 *          $ref: '#/components/responses/ValidationError'
 *       404:
 *          $ref: '#/components/responses/GenreNotFound'
 */
genresRouter.get('/:id', getGenreById);

export default genresRouter;
