const { Router } = require("express");
const express = require("express");
const userRoutes = require("./userRoutes");
const offerRoutes = require("./offerRoutes");
const userWantOffersRoutes = require("./userWantOffersRoutes");
const pictureOfferRoutes = require("./pictureOfferRoutes");
const categoryRoutes = require("./categoryRoutes");
const AuthRouter = require('./AuthRoutes');
const { register, login, updateUser, deleteUser } = require('../controllers/AuthController');
const { verifyAccessToken } = require('../utils/jwt.utils');

const router = express.Router();

router.get("/", (req, res) => {
  /* Main route */
  return res.json({ hello: "world" });
});

/*** ? Test create users and token */

/* routes User */
router.use("/auth", AuthRouter);

router.use("/users", verifyAccessToken, userRoutes);

/* routes Offer */
router.use("/offers", offerRoutes);

/* routes Images */
router.use("/uploads", express.static("uploads"));

/* routes Images offers*/
router.use("/uploads/offers", express.static("uploads/offers"));
router.use("/pictures", pictureOfferRoutes);
/* routes Images categories */
router.use("/uploads/categories", express.static("uploads/categories"));

/* routes UserWantOffer */
router.use("/userWantOffers", userWantOffersRoutes);

/* routes Categories */
router.use("/categories", categoryRoutes);

module.exports = router;
