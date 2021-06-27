const express = require("express");
const multer = require("multer");
const OfferController = require("../controllers/OfferController");
const ImageUploader = require("../helpers/imagesUploader");

const offerRouter = express.Router();

offerRouter.get("/", (req, res) => {
  OfferController.index(req, res);
});

offerRouter.get("/search", (req, res) => {
  OfferController.searchOffers(req, res);
});

offerRouter.get("/:id", (req, res) => {
  OfferController.getOffer(req, res);
});

offerRouter.get("/by/date/local", (req, res) => {
  OfferController.getOfferByDateLocal(req, res);
});

offerRouter.post("/", multer(ImageUploader).array("images", 3), (req, res) => {
  OfferController.createOffer(req, res);
});

offerRouter.get("/createdBy/:userId", (req, res) => {
  OfferController.getOffersCreatedByUser(req, res);
});

offerRouter.put("/update/:offerId", (req, res) => {OfferController.updateOffer(req, res)});

offerRouter.delete("/:offerId", (req, res) => {
  OfferController.deleteOffer(req, res);
});

module.exports = offerRouter;
