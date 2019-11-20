import { Router } from 'express';
import Student from './app/models/Students';

const routes = new Router();

routes.get('/', async (req, res) => {
  const student = await Student.create({
    name: 'Kallel Roman',
    email: 'kallelr@outlook.com',
    age: '19',
    weight: 68.4,
    height: 1.72,
  });

  return res.json(student);
});

export default routes;
