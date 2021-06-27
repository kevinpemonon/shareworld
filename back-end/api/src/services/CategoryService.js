
const Category = require('../models/Category');


module.exports = {

    async getAllCategories() {
        const categories = await Category.findAll(
            {
                attributes: ['id', 'label', 'image_url'],
                order: [['label', 'asc']],
            }
        );
        categories.map((e) => {

            if (e.image_url) {
                e.image_url = `http://localhost:${process.env.PORT}/${e.image_url}`
            }
        });
        return categories;
    }
};
