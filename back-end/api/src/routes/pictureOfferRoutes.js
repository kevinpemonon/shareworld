const express = require("express");
const path = require("path");
const multer = require("multer");
const PictureOfferController = require("../controllers/PictureOfferController");

const pictureOfferRouter = express.Router();

const configMulter = {
  dest: path.join(__dirname, "../../uploads/offers/"),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "../../uploads/offers/"));
    },
    filename: (req, file, callback) => {
      if (file.originalname === "blob") {
        const fileName = `${new Date().getTime()}.${
          file.mimetype.split("/")[1]
        }`;
        file.originalname = fileName;
        callback(null, fileName);
      } else {
        callback(null, file.originalname);
      }
    },
  }),
};

pictureOfferRouter.get("/:offerId", PictureOfferController.getAllPicturesByOffer);

pictureOfferRouter.get("/offers/:name", PictureOfferController.getFile);

pictureOfferRouter.post("/", multer(configMulter).single("image"), PictureOfferController.createPicture);

pictureOfferRouter.delete("/offers/:name", PictureOfferController.deletePicture);


module.exports = pictureOfferRouter;
