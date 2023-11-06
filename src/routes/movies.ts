import express, { Router } from 'express';
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  getMoviesByGenreName,
  updateMovie,
} from '../controllers/movies';

const moviesRouter: Router = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get a list of movies.
 *     description: Returns a list of movies as an array of objects.
 *     tags:
 *      - Movies
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of movie objects.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 */
moviesRouter.get('/', getMovies);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie.
 *     tags:
 *       - Movies
 *     requestBody:
 *       description: Movie object to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the movie.
 *               description:
 *                 type: string
 *                 description: Description of the movie.
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Release date of the movie (YYYY-MM-DD).
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of genres associated with the movie.
 *     responses:
 *       201:
 *         description: Successful creation of the movie. Returns the created movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         $ref: '#/components/responses/CustomOrValidationError'
 */
moviesRouter.post('/', createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update genre by ID
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to update.
 *     requestBody:
 *       description: Updated movie object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the movie.
 *               description:
 *                 type: string
 *                 description: Description of the movie.
 *               releaseDate:
 *                 type: string
 *                 format: date
 *                 description: Release date of the movie (YYYY-MM-DD).
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of genres associated with the movie.
 *     responses:
 *       200:
 *         description: Successful request. Returns the updated movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         $ref: '#/components/responses/CustomOrValidationError'
 *       404:
 *          $ref: '#/components/responses/MovieNotFound'
 */

moviesRouter.put('/:id', updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete movie by ID
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to delete.
 *     responses:
 *       204:
 *         description: Successful deletion. No content returned.
 *       400:
 *          $ref: '#/components/responses/ValidationError'
 *       404:
 *          $ref: '#/components/responses/MovieNotFound'
 */
moviesRouter.delete('/:id', deleteMovie);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to get.
 *     responses:
 *       200:
 *         description: Successful response. Returns the movie object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *          $ref: '#/components/responses/ValidationError'
 *       404:
 *          $ref: '#/components/responses/MovieNotFound'
 */
moviesRouter.get('/:id', getMovieById);

/**
 * @swagger
 * /movies/genre/{genreName}:
 *   get:
 *     summary: Get movies by genre name
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: genreName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the genre to filter movies.
 *     responses:
 *       200:
 *         description: Successful operation. Returns a list of movies belonging to the specified genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
moviesRouter.get('/genre/:genreName', getMoviesByGenreName);

export default moviesRouter;
