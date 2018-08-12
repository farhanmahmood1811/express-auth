'use strict';

import { Router } from 'express';

import IndexController from './../controller/index'
import ErrorHandler from '../middleware/errorHandler';

const routes = new Router();

routes.get('/', IndexController.get);

routes.use(ErrorHandler);

export default routes;
