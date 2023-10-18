import express, { Router } from 'express';

import { handleNotFound, handleInternalServerError } from '../middlewares/errorHandler';
import healthCheckRouter from './healthCheck';
import usersRouter from './users';
import { homeController } from '../controllers/home';
import { serveSwaggerDocs, setupSwaggerUI } from '../controllers/swagger';
import { PATHS } from '../config/constants';

const routes: Router = express.Router();

routes.get(PATHS.HOME, homeController);

routes.use(PATHS.API_DOCS, serveSwaggerDocs, setupSwaggerUI);

routes.use(PATHS.HEALTH_CHECK, healthCheckRouter);
routes.use(PATHS.USERS, usersRouter);

routes.use(handleNotFound);
routes.use(handleInternalServerError);

export default routes;
