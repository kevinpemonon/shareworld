const PictureOfferService = require("../services/PictureOfferService");

module.exports = {
  async getAllPicturesByOffer(req, res, next) {
    const { offerId } = req.params;
    const response = await PictureOfferService.serviceGetAllPicturesByOffer(
      offerId
    );
    return res.status(201).json(response);
  },

  async getFile(req, res) {
    const { name } = req.params;
    res.sendFile(path.join(__dirname, "../../uploads/offers/" + name));
  },

  async createPicture(req, res, next) {
    const { id } = req.body;
    const image = req.file;
    if (id && image) {
      const response = await PictureOfferService.serviceCreatePicture(
        id,
        image
      );
      if (!response) {
        return res.status(500).json({
          message: "Some error occurred while creating the picture.",
        });
      }
      return res.status(201).json(response);
    }
  },

  async deletePicture(req, res, next) {
    const { name } = req.params;
    if (name) {
      const response = await PictureOfferService.serviceDeletePicture(name);
      if (!response) {
        return res.status(500).json({
          message: "Some error occurred while deleting the picture.",
        });
      }
      return res.status(201).json(response);
    }
  },
};
