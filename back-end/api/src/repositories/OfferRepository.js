const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
  }
);

const mySequelize = new Sequelize("shareworld", "postgres", "pempem", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = {
  /**
   * Repository: Search Offer
   * @param {Object} conditions search, category, state, created_date, distance, lat, long, limit, offset
   * @returns Json
   */
  async repositorySearchOffers(conditions) {
    const {
      search,
      category,
      state,
      created_date,
      distance,
      lat,
      long,
      limit,
      offset,
      sort_by,
    } = conditions;

    var sql = `SELECT 
            ofrs.id, ofrs.label, ofrs.description, ofrs.display_phone, ofrs.display_mail,
            ofrs.state, ofrs.owner_id, ofrs.exchange_address_id, ofrs.category_id, ofrs.created_at,
             adrs.street, adrs.city, adrs.zipcode, adrs.complement, adrs.number, adrs.latitude, adrs.longitude
            FROM offers ofrs
            INNER JOIN addresses adrs
            ON ofrs.exchange_address_id = adrs.id `;

    var remplacements = {};

    const HAVERSINE_PART =
      " (6371 * acos(cos(radians(:latitude)) * cos(radians(adrs.latitude)) * cos(radians(adrs.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(adrs.latitude)))) ";

    // Status open
    sql += "WHERE status = :status ";

    // Remplacements
    remplacements.status = "En cours(ouverte)";

    // Search string in label and description
    if (search) {
      sql += "AND (label ILIKE :search_name OR description ILIKE :search_name)";
      remplacements.search_name = `%${search}%`;
    }

    // Search by category
    if (category) {
      sql += " AND category_id = :category";
      remplacements.category = category;
    }

    // Search by offer state
    if (state) {
      sql += " AND state IN (:state)";
      remplacements.state = state;
    }

    // Search offer by date before X days
    if (created_date) {
      sql += " AND ofrs.created_at >= :date";
      remplacements.date = `${created_date}`;
    }

    // Search offer by distance
    if (distance && lat && long) {
      sql += ` AND ${HAVERSINE_PART} < :distance`;
      remplacements.latitude = lat;
      remplacements.longitude = long;
      remplacements.distance = distance;
    }

    // Sort by
    if (sort_by) {
      if (sort_by == "date") {
        sql += " ORDER BY ofrs.created_at DESC";
      }
      if (sort_by == "distance") {
        sql += ` ORDER BY ${HAVERSINE_PART}`;
      }
    }

    // Limit and offset for pagination
    if (offset !== false && limit) {
      sql += ` OFFSET ${offset} LIMIT ${limit}`;
    }

    sql += ";";

    // Execute the query
    const offers = await sequelize.query(sql, {
      replacements: remplacements,
      type: QueryTypes.SELECT,
    });

    return offers;
  },

  /**
   * Repository: Count search offers
   * @param {Object} conditions search, category, state, created_date, distance, lat, long
   * @returns Json
   */
  async repositoryCountSearchOffers(conditions) {
    const {
      search,
      category,
      state,
      created_date,
      distance,
      lat,
      long,
    } = conditions;

    var countSql = `SELECT 
            COUNT(*)
            FROM offers ofrs
            INNER JOIN addresses adrs
            ON ofrs.exchange_address_id = adrs.id `;

    var remplacements = {};

    const HAVERSINE_PART =
      " (6371 * acos(cos(radians(:latitude)) * cos(radians(adrs.latitude)) * cos(radians(adrs.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(adrs.latitude)))) ";

    // Status open
    countSql += "WHERE status = :status ";

    // Remplacements
    remplacements.status = "En cours(ouverte)";

    // Search string in label and description
    if (search) {
      countSql +=
        "AND (label ILIKE :search_name OR description ILIKE :search_name)";
      remplacements.search_name = `%${search}%`;
    }

    // Search by category
    if (category) {
      countSql += " AND category_id = :category";
      remplacements.category = category;
    }

    // Search by offer state
    if (state) {
      countSql += " AND state IN (:state)";
      remplacements.state = state;
    }

    // Search offer by date before X days
    if (created_date) {
      countSql += " AND ofrs.created_at >= :date";
      remplacements.date = `${created_date}`;
    }

    // Search offer by distance
    if (distance && lat && long) {
      countSql += ` AND ${HAVERSINE_PART} < :distance`;
      remplacements.latitude = lat;
      remplacements.longitude = long;
      remplacements.distance = distance;
    }

    countSql += ";";

    // Execute the query
    const offers = await sequelize.query(countSql, {
      replacements: remplacements,
      type: QueryTypes.SELECT,
    });

    return offers;
  },

  async repositoryGetOfferById(_id) {
    const result = mySequelize.query("SELECT * FROM offers where id = $id", {
      bind: {
        id: _id,
      },
      type: QueryTypes.SELECT,
    });
    return result;
  },

  async repositoryUpdateOffer(_id, newOffer, newAddressId) {
    const result = await mySequelize.query(
      "UPDATE offers SET " +
        "label = $label, description = $description, " +
        "display_phone = $display_phone, display_mail = $display_mail, " +
        "state = $state, is_owner_address = $is_owner_address, " +
        "category_id = $category_id, " +
        "exchange_address_id = $exchange_address_id " +
        "WHERE id = $id RETURNING *",
      {
        bind: {
          label: newOffer.label,
          description: newOffer.description,
          display_phone: newOffer.display_phone,
          display_mail: newOffer.display_mail,
          state: newOffer.state,
          is_owner_address: newOffer.is_owner_address,
          category_id: newOffer.category_id,
          exchange_address_id: newAddressId,
          id: _id,
        },
        type: QueryTypes.UPDATE,
      }
    );
    return result;
  },

  async repositoryDeleteOffer(_id) {
    const result = mySequelize.query(
      "DELETE FROM offers WHERE id = $id RETURNING *",
      {
        bind: {
          id: _id,
        },
        type: QueryTypes.DELETE,
      }
    );
    return result;
  },

  async repositoryGetOffersCreatedByUser(userId) {
    const offersCreatedByUser = [];
    const offers = await mySequelize.query(
      "SELECT * FROM offers WHERE owner_id = $id ORDER BY id",
      {
        bind: {
          id: userId,
        },
        type: QueryTypes.SELECT,
      }
    );
    for (const offer of offers) {
      const tmpOffer = {
        id: offer.id,
        label: offer.label,
        description: offer.description,
        display_phone: offer.display_phone,
        display_mail: offer.display_mail,
        state: offer.state,
        status: offer.status,
        is_owner_address: offer.is_owner_address,
        created_at: offer.created_at,
        exchange_address_id: offer.exchange_address_id,
        category_id: offer.category_id,
        wanted_by_users: [],
        exchange_address: {},
        owner: {},
        pictures: [],
      };

      const userWantOffers = await mySequelize.query(
        "SELECT users.id, users.first_name, users.last_name, users.phone, " +
          "users.mail, users.note, user_want_offers.validate_by_owner," +
          "user_want_offers.validate_by_aquirer FROM user_want_offers " +
          "JOIN users ON user_want_offers.user_id = users.id " +
          "WHERE offer_id = $offerId",
        {
          bind: {
            offerId: offer.id,
          },
          type: QueryTypes.SELECT,
        }
      );
      tmpOffer.wanted_by_users = userWantOffers;

      const owner = await mySequelize.query(
        "SELECT * FROM users WHERE id = $id",
        {
          bind: {
            id: userId,
          },
          type: QueryTypes.SELECT,
        }
      );
      const addressOwner = await mySequelize.query(
        "SELECT * FROM addresses WHERE id = $id",
        {
          bind: {
            id: owner[0].address_id,
          },
          type: QueryTypes.SELECT,
        }
      );
      const tmpOwner = {
        id: owner[0].id,
        first_name: owner[0].first_name,
        last_name: owner[0].last_name,
        phone: owner[0].phone,
        mail: owner[0].mail,
        note: owner[0].note,
        address: {},
      };
      tmpOwner.address = addressOwner[0];
      tmpOffer.owner = tmpOwner;

      const exchangeAddress = await mySequelize.query(
        "SELECT * FROM addresses WHERE id = $id",
        {
          bind: {
            id: offer.exchange_address_id,
          },
          type: QueryTypes.SELECT,
        }
      );
      tmpOffer.exchange_address = exchangeAddress[0];

      const pictures = await mySequelize.query(
        "SELECT * FROM pictures_offer WHERE offer_id = $id",
        {
          bind: {
            id: offer.id,
          },
          type: QueryTypes.SELECT,
        }
      );
      tmpOffer.pictures = pictures;
      offersCreatedByUser.push(tmpOffer);
    }

    return offersCreatedByUser;
  },
};
