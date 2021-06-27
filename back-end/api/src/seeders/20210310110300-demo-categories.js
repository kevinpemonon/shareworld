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
     await queryInterface.bulkInsert('categories', [
      {
        label: 'Autre',
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        label: 'DVD et Blu-Ray',
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        label: 'Informatique',
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        label: 'Jeux-vidéo',
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        label: 'Jouets',
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        label: 'Meubles',
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        label: 'Musique',
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        label: 'Sports et loisirs',
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
      },
      {
        label: 'Vêtements et chaussures',
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
