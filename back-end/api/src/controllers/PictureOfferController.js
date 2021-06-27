const PictureOfferService = require("../services/PictureOfferService");

module.exports = {
  async getAllPicturesByOffer(req, res) {
    const { offerId } = req.params;
    if (offerId) {
      const response = await PictureOfferService.serviceGetAllPicturesByOffer(
        offerId
      );
      if (!response) {
        return res
          .status(500)
          .json({ message: "Some error occurred while creating the picture." });
      }
      return res.status(201).json(response);
    } else {
      return res
        .status(400)
        .json({ message: "name can not be null or undefined" });
    }
  },

  async getFile(req, res) {
    const { name } = req.params;
    if (name) {
      const response = await PictureOfferService.serviceGetFile(name);
      if (!response) {
        return res
          .status(500)
          .json({ message: "Some error occurred while creating the picture." });
      }
      return res.status(201).json(response);
    } else {
      return res
        .status(400)
        .json({ message: "name can not be null or undefined" });
    }
  },

  async createPicture(req, res) {
    const { id } = req.body;
    const image = req.file;
    if (id && image) {
      const response = await PictureOfferService.serviceCreatePicture(
        id,
        image
      );
      if (!response) {
        return res
          .status(500)
          .json({ message: "Some error occurred while creating the picture." });
      }
      return res.status(201).json(response);
    }
  },

  async deletePicture(req, res) {
    const { name } = req.params;
    if (name) {
      const response = await PictureOfferService.serviceDeletePicture(name);
      if (!response) {
        return res
          .status(500)
          .json({ message: "Some error occurred while deleting the picture." });
      }
      return res.status(201).json(response);
    }
  },
};
