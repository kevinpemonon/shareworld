'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('user_has_favorites', [
      {
        user_id: 1,
        offer_id: 5,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        user_id: 2,
        offer_id: 1,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        user_id: 2,
        offer_id: 2,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
