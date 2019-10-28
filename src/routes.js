import {Router} from 'express';


import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);


routes.use(authMiddleware);
routes.post('/register', StudentsController.store);
routes.put('/student/:id', StudentsController.update);
routes.put('/users', UserController.update);

routes.post('/plans', PlanController.store);

export default routes;
