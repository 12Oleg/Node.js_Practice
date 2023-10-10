const express = require('express');

const { handleNotFound, handleInternalServerError } = require('../middlewares/errorHandler');
const healthCheckRouter = require('./healthCheck');
const usersRouter = require('./users');
const homeController = require('../controllers/home')
const { serveSwaggerDocs, setupSwaggerUI } = require ('../controllers/swagger')
const { PATHS } = require('../config/constants');

const routes = express.Router();

routes.get(PATHS.HOME, homeController);
  
routes.use(PATHS.API_DOCS, serveSwaggerDocs, setupSwaggerUI);
  
routes.use(PATHS.HEALTH_CHECK, healthCheckRouter);
routes.use(PATHS.USERS, usersRouter)
  
routes.use(handleNotFound);
routes.use(handleInternalServerError);

module.exports = routes;