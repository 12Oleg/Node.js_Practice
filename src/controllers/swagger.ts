import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import swaggerOptions from '../config/swagger';

const generateSwaggerSpec = swaggerJsdoc(swaggerOptions);

export const serveSwaggerDocs = swaggerUi.serve;
export const setupSwaggerUI = swaggerUi.setup(generateSwaggerSpec);
