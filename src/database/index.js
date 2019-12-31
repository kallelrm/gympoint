import Sequelize from 'sequelize';

import User from '../app/models/User';
import Students from '../app/models/Students';
import Plans from '../app/models/Plans';
import Registrations from '../app/models/Registrations';

import databaseConfig from '../config/database';

const models = [User, Students, Plans, Registrations];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
