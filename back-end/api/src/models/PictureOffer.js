const { Model, DataTypes } = require("sequelize");

class PictureOffer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING(255),
        url: DataTypes.STRING(255),
      },
      {
        sequelize,
        modelName: "pictures_offer",
        freezeTableName: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Offer, { foreignKey: "offer_id", as: "offer" });
  }
}

module.exports = PictureOffer;
