const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const users = await User.findAll();
        return res.json(users);
    },
    /* Create a User */
    async store(req, res) {
        const { first_name, last_name, phone, avatar, credit, mail, created_at } = req.body;

        const user = await User.create(first_name, last_name, phone, avatar, credit, mail, created_at);

        return res.json(user);
    }
};