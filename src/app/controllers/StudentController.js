import Students from '../models/Students';

class StudentController {
  async index(req, res) {
    const students = await Students.findAll();

    return res.json(students);
  }

  async store(req, res) {
    const studentExists = await Students.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { name, email, age, height, weight } = await Students.create(
      req.body
    );

    return res.json({
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async update(req, res) {
    return res.json({ message: 'ok' });

    // const studentExists = await Students.findOne({
    //   where: { email: req.body.email },
    // });

    // if (!studentExists) {
    //   return res.status(400).json({ error: 'User does not exists' });
    // }

    // const { name, email, age, height, weight } = await Students.update(
    //   req.body
    // );

    // return res.json({ message: 'User updated succesfully' });
  }
}

export default new StudentController();
