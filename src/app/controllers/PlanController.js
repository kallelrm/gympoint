import * as Yup from 'yup';

import Plan from '../models/Plans';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid plan parameters' });
    }

    const plan = await Plan.findOne({
      where: { title: req.body.title },
    });

    console.log(plan);

    if (plan) {
      return res.status(400).json({ error: 'plan already exists' });
    }

    const { title, price, duration } = await Plan.create(req.body);

    return res.json({ title, price, duration });
  }

  async delete(req, res) {
    const { id } = req.params;
    const plans = await Plan.findByPk(id);

    if (!plans) {
      return res.status(400).json({ error: 'Plan not found' });
    }

    await Plan.destroy({
      where: { id },
    });

    return res.json({ message: 'success' });
  }
}

export default new PlanController();
