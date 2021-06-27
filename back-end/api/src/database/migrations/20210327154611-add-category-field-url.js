'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'categories',
      'image_url',
      {
        type: Sequelize.STRING(255),
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'categories',
      'image_url',
    );
  }
};
