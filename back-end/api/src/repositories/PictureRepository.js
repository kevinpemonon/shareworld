const PictureOffer = require('../models/PictureOffer');

module.exports = {

    /**
     * Repository: Get pictures by offer
     * @param {Integer} conditions offer id
     * @returns Array
     */
    async repositoryGetPicturesByOffer(offer_id) {

        const pictures = await PictureOffer.findAll({
            attributes: ['name', 'url'],
            where: {
                offer_id: offer_id,
            }
        });

        pictures.map((e) => {

            if (e.url) {
                // e.url = `http://localhost:${process.env.PORT}/${e.url}`
                e.url = `http://localhost:${process.env.PORT}/pictures/${e.url}`
            }
        });

        return pictures;
    },

}