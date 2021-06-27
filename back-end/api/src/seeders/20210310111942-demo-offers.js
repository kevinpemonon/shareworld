"use strict";

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
    await queryInterface.bulkInsert("offers", [
      {
        label: "Guitare Folk",
        description: "Il manque les cordes",
        display_phone: true,
        display_mail: true,
        state: "Bon état",
        status: "En cours(ouverte)",
        owner_id: 1,
        exchange_address_id: 1,
        category_id: 7,
        is_owner_address: true,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
      {
        label: "Guitare Acoustique",
        description: "",
        display_phone: true,
        display_mail: false,
        state: "À bricoler",
        status: "Donné(fermée)",
        owner_id: 1,
        exchange_address_id: 5,
        category_id: 7,
        is_owner_address: false,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
      {
        label: "Ballon de football",
        description: "",
        display_phone: true,
        display_mail: false,
        state: "Comme neuf",
        status: "En cours(ouverte)",
        owner_id: 1,
        exchange_address_id: 1,
        category_id: 8,
        is_owner_address: true,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
      {
        label: "Chaussures de randonnées",
        description: "",
        display_phone: false,
        display_mail: false,
        state: "État Moyen",
        status: "En cours(ouverte)",
        owner_id: 2,
        exchange_address_id: 2,
        category_id: 9,
        is_owner_address: true,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
      {
        label: "Souris d'ordinateur",
        description: "",
        display_phone: true,
        display_mail: true,
        state: "État Moyen",
        status: "En cours(ouverte)",
        owner_id: 2,
        exchange_address_id: 2,
        category_id: 3,
        is_owner_address: true,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
      {
        label: "DVD",
        description: "",
        display_phone: true,
        display_mail: true,
        state: "Bon état",
        status: "En cours(ouverte)",
        owner_id: 3,
        exchange_address_id: 3,
        category_id: 2,
        is_owner_address: true,
        created_at: "2021-03-10",
        updated_at: "2021-03-10",
      },
      {
        label: "Pantalon en lin",
        description: "Taille 40",
        display_phone: true,
        display_mail: true,
        state: "État Moyen",
        status: "En cours(ouverte)",
        owner_id: 3,
        exchange_address_id: 4,
        category_id: 9,
        is_owner_address: false,
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
