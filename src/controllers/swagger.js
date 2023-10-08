const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = require('../config/swagger');

const generateSwaggerSpec = swaggerJsdoc(swaggerOptions);

const serveSwaggerDocs = swaggerUi.serve;
const setupSwaggerUI = swaggerUi.setup(generateSwaggerSpec);

module.exports = {
  serveSwaggerDocs,
  setupSwaggerUI,
};
