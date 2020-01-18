import Sequelize, { Model } from 'sequelize';

class Registrations extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Students, { foreignKey: 'student_id' });
    this.belongsTo(models.Plans, { foreignKey: 'plan_id' });
  }
}

export default Registrations;
