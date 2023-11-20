import express, { Router } from 'express';

import { handleNotFound } from '../middlewares/errorHandler';
import healthCheckRouter from './healthCheck';
import { homeController } from '../controllers/home';
import { serveSwaggerDocs, setupSwaggerUI } from '../controllers/swagger';
import { PATHS } from '../config/constants';
import genresRouter from './genres';
import moviesRouter from './movies';

const routes: Router = express.Router();

routes.get(PATHS.HOME, homeController);

routes.use(PATHS.API_DOCS, serveSwaggerDocs, setupSwaggerUI);

routes.use(PATHS.HEALTH_CHECK, healthCheckRouter);
routes.use(PATHS.GENRES, genresRouter);
routes.use(PATHS.MOVIES, moviesRouter);

routes.use(handleNotFound);

export default routes;
