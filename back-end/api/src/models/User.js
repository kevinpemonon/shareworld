const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        first_name: DataTypes.STRING(45),
        last_name: DataTypes.STRING(45),
        full_name: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${this.first_name} ${this.last_name}`;
          },
          set(value) {
            throw new Error("Do not try to set the `fullName` value!");
          },
        },
        phone: DataTypes.STRING(20),
        url_avatar: DataTypes.STRING(255),
        credit: DataTypes.INTEGER,
        mail: DataTypes.STRING(255),
        password_hash: DataTypes.STRING(255),
        status: DataTypes.ENUM({
          values: ["active", "inactive", "banned"],
        }),
        note: DataTypes.DECIMAL(2, 1),
        number_notes: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Offer, { foreignKey: "owner_id", as: "offers" });
    this.belongsTo(models.Address, { foreignKey: "address_id", as: "address" });
    this.belongsToMany(models.Offer, {
      foreignKey: "user_id",
      through: "user_want_offers",
      as: "user_want_some_offers",
    });
    this.belongsToMany(models.Offer, {
      foreignKey: "user_id",
      through: "user_has_favorites",
      as: "user_has_some_favorites",
    });
  }
}

module.exports = User;
