const express = require('express');
const UserController = require('../controllers/UserController');

const userRouter = express.Router();


userRouter.get('/', UserController.index);
userRouter.post('/', UserController.store);

module.exports = userRouter;