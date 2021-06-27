const { Model, DataTypes } = require("sequelize");

class Offer extends Model {
  static init(sequelize) {
    super.init(
      {
        label: DataTypes.STRING(45),
        description: DataTypes.TEXT,
        display_phone: DataTypes.BOOLEAN,
        display_mail: DataTypes.BOOLEAN,
        state: DataTypes.ENUM({
          values: ["Comme neuf", "Bon état", "État Moyen", "À bricoler"],
        }),
        status: DataTypes.ENUM({
          values: ["En cours(ouverte)", "Donné(fermée)", "Bannie(fermée)"],
        }),
        is_owner_address: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "owner_id", as: "owner" });
    this.belongsTo(models.Address, {
      foreignKey: "exchange_address_id",
      as: "exchange_address",
    });
    this.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
    this.hasMany(models.pictures_offer, {
      foreignKey: "offer_id",
      as: "pictures",
    });
    this.belongsToMany(models.User, {
      foreignKey: "offer_id",
      through: "user_want_offers",
      as: "wanted_by_users",
    });
    this.belongsToMany(models.User, {
      foreignKey: "offer_id",
      through: "user_has_favorites",
      as: "favorites_of_user",
    });
  }
}

module.exports = Offer;
