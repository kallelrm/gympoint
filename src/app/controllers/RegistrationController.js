import Registration from '../models/Registrations';

class RegistrationController {
  async index(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new RegistrationController();
