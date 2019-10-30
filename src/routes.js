import {Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';


import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import FileController from './app/controllers/FileController';


import authMiddleware from './app/middlewares/auth';
import adminCheck from './app/middlewares/admincheck';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);


routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/register', StudentsController.store);
routes.put('/student/:id', StudentsController.update);
routes.put('/users', UserController.update);

routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/help-orders', HelpOrderController.index);
routes.get('/students/:id/help-orders', HelpOrderController.show);
routes.put('/students/help-orders/:id/answer', HelpOrderController.update);

routes.use(adminCheck);
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollments/:id' , EnrollmentController.update);

routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

export default routes;
