require('dotenv').config();

console.log(`DB_USERNAME ${process.env.DB_USERNAME}`)

module.exports = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'postgres',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
};