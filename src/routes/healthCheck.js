const express = require('express');

const { healthCheck } = require('../controllers/healthCheck')

const router = express.Router();

/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check the server status.
 *     description: Returns the server status to verify its functionality.
 *     tags:
 *     - Health Check
 *     responses:
 *       200:
 *         description: The server is running normally.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Server is running"
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', healthCheck);

module.exports = router;
