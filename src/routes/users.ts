import express, { Router } from 'express';

import { getUsers } from '../controllers/users';

const usersRouter: Router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users.
 *     description: Returns a list of users as an array of objects.
 *     tags:
 *      - Users
 *     responses:
 *       200:
 *         description: Successful response. Returns an array of user objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
usersRouter.get('/', getUsers);

export default usersRouter;
