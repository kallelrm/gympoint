import Plan from '../models/Plans';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json({ plans });
  }
}

export default new PlanController();
