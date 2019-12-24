module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('plans', [
      {
        title: 'starter',
        duration: 1,
        price: 129,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'gold',
        duration: 3,
        price: 109,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'diamond',
        duration: 6,
        price: 89,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: 'champion',
        duration: 12,
        price: 69,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const Op = { Sequelize };
    return queryInterface.bulkDelete(
      'plans',
      { id: { [Sequelize.Op.gt]: 1 } },
      {}
    );
  },
};
