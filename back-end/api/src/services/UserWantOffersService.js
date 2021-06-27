require("dotenv").config();
const Offer = require("../models/Offer");
const User = require("../models/User");
const Address = require("../models/Address");
const PictureOffer = require("../models/PictureOffer");
const { Sequelize, QueryTypes } = require("sequelize");

// const sequelize = new Sequelize("shareworld", "postgres", "pempem", {
//   host: "localhost",
//   dialect: "postgres",
// });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  "postgres",
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

module.exports = {
  async getOffersCreatedByUser(userId) {
    const offers = await Offer.findAll({
      attributes: [
        "id",
        "label",
        "description",
        "display_phone",
        "display_mail",
        "state",
        "status",
        "created_at",
        "is_owner_address",
        "category_id",
      ],
      where: { owner_id: userId },
      include: [
        {
          model: User,
          as: "wanted_by_users",
          attributes: [
            "id",
            "first_name",
            "last_name",
            "phone",
            "mail",
            "note",
          ],
          through: {
            attributes: ["validate_by_owner", "validate_by_aquirer"],
          },
        },
        {
          model: User,
          as: "owner",
          attributes: ["id"],
          include: [
            {
              model: Address,
              as: "address",
            },
          ],
        },
        {
          model: Address,
          as: "exchange_address",
          attributes: [
            "id",
            "street",
            "city",
            "zipcode",
            "complement",
            "number",
          ],
        },
        {
          model: PictureOffer,
          as: "pictures",
        },
      ],
    });
    return offers;
  },

  async getOffersWantedByUser(_userId) {
    const offers = await sequelize.query(
      "SELECT * FROM offers JOIN user_want_offers on id = offer_id where user_id = $userId;",
      {
        bind: {
          userId: _userId,
        },
        type: QueryTypes.SELECT,
      }
    );
    return offers;
  },

  async serviceUpdateOwnerAcceptDemand(_offerId, _userId, _newValue) {
    if (_newValue.newValue) {
      return await sequelize.query(
        "UPDATE user_want_offers SET validate_by_owner = $newValue WHERE offer_id = $offerId",
        {
          bind: {
            newValue: false,
            offerId: _offerId,
          },
          type: QueryTypes.UPDATE,
        }
      );
    }
    return await sequelize.query(
      "UPDATE user_want_offers SET validate_by_owner = $newValue WHERE user_id = $userId AND offer_id = $offerId",
      {
        bind: {
          newValue: _newValue.newValue,
          userId: _userId,
          offerId: _offerId,
        },
        type: QueryTypes.UPDATE,
      }
    );
  },
};
