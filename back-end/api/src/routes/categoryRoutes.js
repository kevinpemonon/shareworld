const express = require('express');
const multer = require('multer');
const CategoryController = require('../controllers/CategoryController');

const categoryRouter = express.Router();

/* callback CategoryController functions */

/* Get all categories */
categoryRouter.get('/', CategoryController.index);



module.exports = categoryRouter;