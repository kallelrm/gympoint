import * as Yup from 'yup';
import { addMonths, format } from 'date-fns';
import pt from 'date-fns/locale';
import Registration from '../models/Registrations';
import Student from '../models/Students';
import Plan from '../models/Plans';

import Mail from '../../lib/Mail';

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

    const student = await Student.findByPk(student_id);

    const plan = await Plan.findOne({
      where: { id: plan_id },
    });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

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

    await Mail.sendMail({
      to: `${student.name}, <${student.email}>`,
      subject: 'Registro realizado com sucesso',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        duration: plan.duration,
        endDate: format(end_date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });

    return res.json({ register });
  }

  async delete(req, res) {
    const { id } = req.params;

    const registration = await Registration.findOne({
      where: { id },
    });

    if (!registration) {
      return res.json({ error: 'registration not found' });
    }

    await Registration.destroy({
      where: { id },
    });

    return res.json({ registration });
  }
}

export default new RegistrationController();
