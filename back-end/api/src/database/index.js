const Sequelize = require('sequelize');
const dbConfig = require('../config/config');

/*  User model */
const User = require('../models/User');

/*  Address model */
const Address = require('../models/Address');

/*  Category model */
const Category = require('../models/Category');

/*  Offer model */
const Offer = require('../models/Offer');

/*  Picture model */
const Picture = require('../models/PictureOffer');

/* Connect with DB */
const connection = new Sequelize(dbConfig);

/* Connect Models with DB */
User.init(connection);
Address.init(connection);
Category.init(connection);
Offer.init(connection);
Picture.init(connection);

/* Associations */
User.associate(connection.models);
Address.associate(connection.models);
Category.associate(connection.models);
Offer.associate(connection.models);
Picture.associate(connection.models);

module.exports = connection;