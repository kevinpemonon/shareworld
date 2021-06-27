"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("addresses", [
      {
        street: "Rue Condorcet",
        city: "Villejuif",
        zipcode: "94800",
        complement: "",
        number: 5,
        latitude: 48.798301696777344,
        longitude: 2.368318557739258,
        created_at: "2021-10-03",
        updated_at: "2021-10-03",
      },
      {
        street: "Rue du moulin de la pointe",
        city: "Paris",
        zipcode: "75013",
        complement: "Batiment A",
        number: 38,
        latitude: 48.822776794433594,
        longitude: 2.3565638065338135,
        created_at: "2021-10-03",
        updated_at: "2021-10-03",
      },
      {
        street: "Rue des Archives",
        city: "Paris",
        zipcode: "75004",
        complement: "",
        number: 43,
        latitude: 48.86013486501713,
        longitude: 2.356907129287733,
        created_at: "2021-10-03",
        updated_at: "2021-10-03",
      },
      {
        street: "Rue Auguste Dorchain",
        city: "Paris",
        zipcode: "75015",
        complement: "",
        number: 1,
        latitude: 48.84501799150611,
        longitude: 2.297855615615858,
        created_at: "2021-10-03",
        updated_at: "2021-10-03",
      },
      {
        street: "Rue Oberkampf",
        city: "Paris",
        zipcode: "75011",
        complement: "",
        number: 62,
        latitude: 48.866948199246366,
        longitude: 2.382656335830702,
        created_at: "2021-10-03",
        updated_at: "2021-10-03",
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
