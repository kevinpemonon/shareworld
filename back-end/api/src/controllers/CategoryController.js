const CategoryService = require('../services/CategoryService');
const { QueryTypes } = require("sequelize");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DB_HOST
});

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