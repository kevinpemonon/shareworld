"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("pictures_offer", [
      {
        name: "guitare1",
        url: "offers/guitare1.jpg",
        offer_id: 1,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
      {
        name: "guitare2",
        url: "offers/guitare2.jpg",
        offer_id: 1,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
      {
        name: "guitare3",
        url: "offers/guitare3.jpg",
        offer_id: 2,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
