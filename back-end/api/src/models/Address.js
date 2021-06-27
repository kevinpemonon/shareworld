const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(sequelize) {
        super.init({
            street: DataTypes.STRING(50),
            city: DataTypes.STRING(45),
            zipcode: DataTypes.STRING(20),
            complement: DataTypes.TEXT,
            number: DataTypes.INTEGER,
            latitude: DataTypes.DECIMAL(8, 7),
            longitude: DataTypes.DECIMAL(10, 8),
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.hasOne(models.User, { foreignKey: 'address_id', as: 'address_has_user' });
        this.hasOne(models.Offer, { foreignKey: 'exchange_address_id', as: 'addres_has_offer' });
    }
}

module.exports = Address;