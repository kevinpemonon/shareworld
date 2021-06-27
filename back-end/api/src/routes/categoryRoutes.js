const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.index);

module.exports = categoryRouter;