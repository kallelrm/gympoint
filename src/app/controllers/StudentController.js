import * as Yup from 'yup';
import Student from '../models/Students';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
    });

    console.log(JSON.stringify(req.body));

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation failure', schema });
    }

    const student = await Student.findOne({
      where: { email: req.body.email },
    });

    if (student) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { name, email, age, height, weight } = await Student.create(req.body);

    return res.json({
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .positive(),
      height: Yup.number().positive(),
      weight: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ Error: 'Validation failure' });
    }

    // const emailExists = await Student.findOne({
    //   where: { email: req.body.email },
    //   ,
    // });

    // if (emailExists) {
    //   return res.status(400).json({ error: 'email already exists' });
    // }
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    if (student.email !== req.body.email) {
      const validStudent = await Student.findOne({
        where: { email: req.body.email },
      });
      if (validStudent) {
        return res.status(400).json({ error: 'Email is not available' });
      }
    }

    const { id, name, email, age, weight, height } = await student.update(
      req.body
    );

    return res.json({ id, name, email, age, weight, height });
  }
}

export default new StudentController();
