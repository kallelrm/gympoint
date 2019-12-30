import Sequelize, { Model } from 'sequelize';

class Plans extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
        total_price: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.getDataValue('price') * this.getDataValue('duration');
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Plans;
