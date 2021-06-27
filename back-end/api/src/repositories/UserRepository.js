const { Sequelize, QueryTypes } = require("sequelize");

const mySequelize = new Sequelize("shareworld", "postgres", "pempem", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {
  async getOwnerAddressId(userId) {
    const result = mySequelize.query(
      "SELECT address_id FROM users WHERE id = $id",
      {
        bind: {
          id: userId,
        },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  },
};
