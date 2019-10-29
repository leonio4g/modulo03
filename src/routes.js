import {Router} from 'express';


import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';

import authMiddleware from './app/middlewares/auth';
import adminCheck from './app/middlewares/admincheck';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);


routes.use(authMiddleware);
routes.post('/register', StudentsController.store);
routes.put('/student/:id', StudentsController.update);
routes.put('/users', UserController.update);

routes.use(adminCheck);
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);

export default routes;
