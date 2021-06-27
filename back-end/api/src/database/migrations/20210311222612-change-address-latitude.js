'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'addresses',
      'latitude',
      {
        type: Sequelize.DECIMAL(14, 11),
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'addresses',
      'latitude',
      {
        type: Sequelize.DECIMAL(8, 7),
      }
    );
  }
};
