// "use strict";
// module.exports = (sequelize, DataTypes) => {
//   var UserWantOffers = sequelize.define(
//     "user_want_offers",
//     {
//       validate_by_owner: DataTypes.BOOLEAN,
//       validate_by_aquirer: DataTypes.BOOLEAN,
//     },
//     {
//       classMethods: {
//         associate: function (models) {
//           this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
//           this.belongsTo(models.Offer, {
//             foreignKey: "offer_id",
//             as: "offers",
//           });
//         },
//       },
//     }
//   );
//   return UserWantOffers;
// };

// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class UserWantOffer extends Model {
//     static associate(models) {
//       this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
//       this.belongsTo(models.Offer, { foreignKey: "offer_id", as: "offers" });
//     }
//   }
//   UserWantOffer.init(
//     {
//       // user_id: DataTypes.INTEGER,
//       // offer_id: DataTypes.INTEGER,
//       validate_by_owner: DataTypes.BOOLEAN,
//       validate_by_aquirer: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: "user_want_offers",
//     }
//   );
//   return UserWantOffer;
// };

const { Model, DataTypes } = require("sequelize");

class UserWantOffers extends Model {
  static init(sequelize) {
    super.init(
      {
        // user_id: DataTypes.INTEGER,
        // offer_id: DataTypes.INTEGER,
        validate_by_owner: DataTypes.BOOLEAN,
        validate_by_aquirer: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        modelName: "user_want_offers",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "users" });
    this.belongsTo(models.Offer, { foreignKey: "offer_id", as: "offers" });
  }
}

module.exports = UserWantOffers;
