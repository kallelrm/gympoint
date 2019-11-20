import { Router } from 'express';

import StudentController from './app/controllers/StudentController';

const routes = new Router();

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

export default routes;
