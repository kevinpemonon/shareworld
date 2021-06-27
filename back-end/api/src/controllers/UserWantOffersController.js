const UserWantOffersService = require("../services/UserWantOffersService");

module.exports = {
  async getOffersCreatedByUser(req, res, next) {
    const { userId } = req.params;
    try {
      const response = await UserWantOffersService.getOffersCreatedByUser(
        userId
      );

      if (!response) {
        return res.status(400).json({
          error: "Offers not found!",
        });
      }
      return res.status(201).json(response);
    } catch (e) {
      return next(e);
    }
  },

  async getOffersWantedByUser(req, res, next) {
    console.log("Controller");
    const { userId } = req.params;
    try {
      const response = await UserWantOffersService.getOffersWantedByUser(
        userId
      );
      if (!response) {
        return res.status(400).json({
          error: "Not wanted offers for this user",
        });
      }
      return res.status(201).json(response);
    } catch (e) {
      console.log("Error : " + e);
      return next(e);
    }
  },

  async updateOwnerAcceptDemand(req, res) {
    const { offerId, userId } = req.params;
    const newValue = req.body;
    try {
      const response = await UserWantOffersService.serviceUpdateOwnerAcceptDemand(
        offerId,
        userId,
        newValue
      );
      return res.status(201).json(response);
    } catch (e) {
      return res.status(500).json({
        message: e.message || "Some error occurred while updating the demand.",
      });
    }
  },
};
