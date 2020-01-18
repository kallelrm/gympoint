import * as Yup from 'yup';
import { addMonths } from 'date-fns';
import Registration from '../models/Registrations';
import Student from '../models/Students';
import Plan from '../models/Plans';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll();
    return res.json({ registrations });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { student_id, plan_id } = req.body;

    const student = await Student.findOne({
      where: { id: student_id },
    });

    const plan = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    console.log(plan.duration);

    const start_date = new Date();
    const end_date = addMonths(new Date(), plan.duration);
    const price = plan.duration * plan.price;

    const register = await Registration.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({ register });
  }

  async delete(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new RegistrationController();
