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
    const { email, name, age, height, weight } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email not provided' });
    }

    const studentExists = await Students.findOne({
      where: { email },
    });

    if (!studentExists) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    await Students.update(req.body, {
      where: { email },
    });

    return res.json({ email, name, age, height, weight });
  }
}

export default new StudentController();
