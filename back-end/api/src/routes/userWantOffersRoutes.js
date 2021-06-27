const express = require('express');
const UserWantOffersController = require('../controllers/UserWantOffersController');

const userWantOfferRouter = express.Router();

/* callback OfferController functions */
userWantOfferRouter.get('/wantedBy/:userId', UserWantOffersController.getOffersWantedByUser);
userWantOfferRouter.put('/updateOwnerAcceptDemand/:offerId/:userId', UserWantOffersController.updateOwnerAcceptDemand);
// userOfferRouter.put('/updateUserValidExchange/:offerId/:userId', UserOffersController.updateOwnerAcceptDemand);

module.exports = userWantOfferRouter;