const Offer = require("../models/Offer");
const offerRouter = require("../routes/offerRoutes");
const OfferService = require("../services/OfferService");

module.exports = {
  /* Get all offers */
  async index(req, res, next) {
    try {
      const response = await OfferService.getAllOffers();
      return res.status(201).json(response);
    } catch (e) {
      return next(e);
    }
  },

  /* Get offer */
  async getOffer(req, res, next) {
    const { id } = req.params;
    try {
      const response = await OfferService.getOffer(id);

      if (response === null) {
        return res.status(404).json({
          error: "Offer not found!",
        });
      }
      return res.status(201).json(response);
    } catch (e) {
      return next(e);
    }
  },

  /* Get offer by date and local */
  async getOfferByDateLocal(req, res, next) {
    const { date, local } = req.query;
    if (date !== undefined && local !== undefined) {
      try {
        const response = await OfferService.getOffersByDateAndLocal(
          date,
          local
        );

        if (!response) {
          return res.status(400).json({
            error: "Offer not found!",
          });
        }
        return res.status(201).json(response);
      } catch (e) {
        return next(e);
      }
    } else {
      return res.status(400).json({
        message: "Incorrect route or params",
      });
    }
  },

  /**
   * Create a offer
   * @param {*} req
   * @param {*} res
   * @param {*} req.body Form.Data =
   *  {
   *      label: String,
   *      description: String,
   *      display_phone: Boolean
   *      display_mail: Boolean
   *      state: String
   *      owner_id: INTEGER
   *      is_owner_address: Boolean
   *      exchange_address: STRING
   *      category_id: INTEGER
   *      images: DataFile[]
   * }
   * @returns Json
   */
  async createOffer(req, res) {
    // Offer table
    const offer = req.body;

    // PictureOffer table
    const files = req.files;

    try {
      // if (!offer.label || !files || files.length < 1 || files.length > 3) {
      //   return res.status(400).json({
      //     error: "Content cannot be empty",
      //   });
      // }

      //Images path
      const baseUrl =
        /* req.protocol + '://' + req.get('host') +  */ "uploads/offers";

      const response = await OfferService.serviceCreateOffer(
        offer,
        files,
        baseUrl
      );

      if (response === null) {
        return res.status(500).json({
          message: "Some error occurred while creating the offer.",
        });
      }

      return res.status(201).json(response);
    } catch (e) {
      return res.status(500).json({
        message: e.message || "Some error occurred while creating the offer.",
      });
    }
  },

  /**
   * Search offers
   * @param {*} req
   * @param {*} res
   * @param {Object} res.query
   * {
   *  search: String,
   *  category: Integer,
   *  state[]: String[],
   *  days: Integer,
   *  distance(Km): Integer,
   *  latitude: Decimal(14,11),
   *  longitude: ecimal(14,11),
   *  page_size: Integer,
   *  page_number: Integer
   *  sort_by : String
   * }
   * @returns  Status and Json
   *
   */
  async searchOffers(req, res) {
    // reqQueryParams
    const params = req.query;

    try {
      const response = await OfferService.serviceSearchOffer(params);

      return res.status(201).json(response);
    } catch (e) {
      return res.status(500).json({
        message: e.message || "Some error occurred while searching the offers.",
      });
    }
  },

  async updateOffer(req, res) {
    const { offerId } = req.params;
    const newOffer = req.body;

    if (!offerId) {
      let error = "OfferId can not be null";
      if (offerId === 0) {
        error = "OfferId can not be 0";
      }
      return res.status(400).json({
        message: error,
      });
    }
    if (!newOffer) {
      return res.status(400).json({
        message: "NewOffer can not be null",
      });
    }

    const response = await OfferService.serviceUpdateOffer(offerId, newOffer);

    if (response.offer === null) {
      return res.status(500).json({
        message: response.message,
      });
    }

    return res.status(200).json(response);
  },

  async deleteOffer(req, res) {
    const { offerId } = req.params;
    if (!offerId) {
      let error = "OfferId can not be null";
      if (offerId === 0) {
        error = "OfferId can not be 0";
      }
      return res.status(400).json({
        message: error,
      });
    }
    const response = await OfferService.serviceDeleteOffer(offerId);
    if (!response.success) {
      return res.status(500).json({
        message: response.message,
      });
    }
    return res.status(200).json(response);
  },

  async getOffersCreatedByUser(req, res) {
    const { userId } = req.params;
    if (!userId) {
      let error = "UserId can not be null";
      if (userId === 0) {
        error = "UserId can not be 0";
      }
      return res.status(400).json({
        message: error,
      });
    }
    const response = await OfferService.serviceGetOffersCreatedByUser(userId);
    console.log(response)
    if (response.offers.length === 0) {
      return res.status(500).json({
        message: response.message,
      });
    }
    return res.status(200).json(response);
  },
};
