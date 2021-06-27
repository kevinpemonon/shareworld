const { Model, DataTypes } = require('sequelize');

class Category extends Model {
    static init(sequelize) {
        super.init({
            label: DataTypes.STRING(45),
            image_url: DataTypes.STRING(255),
        }, {
            sequelize
        })
    }
    static associate(models) {
        this.hasOne(models.Offer, { foreignKey: 'category_id', as: 'offers' });
    }
}

module.exports = Category;