'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_want_offers', {
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      offer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'offers', key: 'id' },
        onDelete: 'CASCADE'
      },
      validate_by_owner: {
        type: Sequelize.BOOLEAN
      },
      validate_by_aquirer: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_want_offers');
  }
};