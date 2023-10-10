const express = require('express');

const usersData = require('../data/users');
const { getUsers } = require('../controllers/users');

const router = express.Router();


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
router.get('/', getUsers);

module.exports = router;
