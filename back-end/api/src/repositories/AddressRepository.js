const { Sequelize, QueryTypes } = require("sequelize");

const mySequelize = new Sequelize("shareworld", "postgres", "pempem", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {

  async createAddress(newAddress, coord) {
    const timestamp = new Date();
    const day = timestamp.getDate();
    const month = (timestamp.getMonth().length = 1
      ? `0${timestamp.getMonth()}`
      : timestamp.getMonth());
    const year = timestamp.getFullYear();
    const date = `${year}/${month}/${day}`;
    const address = mySequelize.query(
      "INSERT INTO addresses(street, city, zipcode, complement, number, latitude, longitude, created_at, updated_at) " +
        "VALUES($street, $city, $zipcode, $complement, $number, $latitude, $longitude, $created_at, $updated_at) RETURNING *",
      {
        bind: {
          street: newAddress.street,
          city: newAddress.city,
          zipcode: newAddress.zipcode,
          complement: newAddress.complement,
          number: newAddress.number,
          latitude: coord[0].latitude,
          longitude: coord[0].longitude,
          created_at: date,
          updated_at: date,
        },
        type: QueryTypes.INSERT,
      }
    );
    return address;
  },

  async deleteAddress(_id) {
    const address = mySequelize.query("DELETE FROM addresses WHERE id = $id", {
      bind: {id: _id},
      type: QueryTypes.DELETE,
    });
    return address;
  },

  async getAddressById(_id) {
    const result = mySequelize.query("SELECT * FROM addresses WHERE id = $id", {
      bind: {id: _id},
      type: QueryTypes.SELECT,
    });
    return result;
  },
};
