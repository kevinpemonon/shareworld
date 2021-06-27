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
     await queryInterface.bulkInsert('users', [
      {
        first_name: 'John',
        last_name: 'Lennon',
        phone: '0645983236',
        url_avatar: '',
        credit: 10,
        mail: 'john.lennon@gmail.com',
        password_hash: 'rfhqozhfoqzehfoZFE',
        status: 'active',
        note: 4.7,
        number_notes: 11,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
        address_id: 1
      },
      {
        first_name: 'Mathias',
        last_name: 'Dugamin',
        phone: '0725285454',
        url_avatar: '',
        credit: 50,
        mail: 'mathias.dugamin@gmail.com',
        password_hash: 'rfhqozhfoqzehfoZFE',
        status: 'banned',
        note: 2.1,
        number_notes: 25,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
        address_id: 2
      },
      {
        first_name: 'Bob',
        last_name: 'Marley',
        phone: '0645983236',
        url_avatar: '',
        credit: 2,
        mail: 'bob.marley@gmail.com',
        password_hash: 'rfhqozhfoqzehfoZFE',
        status: 'active',
        note: 4.9,
        number_notes: 56,
        created_at: '2021-10-03',
        updated_at: '2021-10-03',
        address_id: 3
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
  }
};
