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
     await queryInterface.bulkInsert('user_want_offers', [
      {
        user_id: 2,
        offer_id: 1,
        validate_by_owner: false,
        validate_by_aquirer: false,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        user_id: 3,
        offer_id: 1,
        validate_by_owner: true,
        validate_by_aquirer: false,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        user_id: 2,
        offer_id: 2,
        validate_by_owner: false,
        validate_by_aquirer: false,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        user_id: 3,
        offer_id: 2,
        validate_by_owner: false,
        validate_by_aquirer: false,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        user_id: 3,
        offer_id: 3,
        validate_by_owner: false,
        validate_by_aquirer: false,
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
