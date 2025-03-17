//Importo somente a funcão router
import { Router } from 'express';

import DashboardsController from './app/controllers/DashboardsController';
import SessionsController from './app/controllers/SessionsController';
import OrdersController from './app/controllers/OrdersController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

//################## PROOF #####################

routes.post('/proof/session', SessionsController.store);
//################## PROOF #####################
// Orders Get / Post
routes.post("/orders", OrdersController.store);
routes.get("/orders", OrdersController.index);

//################## MIDDLEWARE AUTH #####################
// routes.use(authMiddleware);
//################## MIDDLEWARE AUTH #####################

//################## AUTH PROOF #####################
//Dashboard
routes.get('/dashboard', DashboardsController.index) // Dashboard

//################## AUTH PROOF #####################

export default routes;
