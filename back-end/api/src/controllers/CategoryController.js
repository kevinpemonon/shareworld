const CategoryService = require('../services/CategoryService');

module.exports = {

    /* Get all categories */
    async index(req, res, next) {

        try {
            const response = await CategoryService.getAllCategories();
            return res.status(201).json(response);
        } catch (e) {
            return next(e);
        }
    }
};