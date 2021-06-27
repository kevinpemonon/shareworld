const Offer = require("../models/Offer");
const User = require("../models/User");
const Address = require("../models/Address");
const Category = require("../models/Category");
const pictureRepository = require("../repositories/PictureRepository");

module.exports = {
  /**
   * Offer Dto Out
   * @param {Offer} offer
   * @returns  OfferDto
   */
  async OfferToDto(offer) {
    try {
      const user = await User.findByPk(offer.owner_id);
      const address = await Address.findByPk(offer.exchange_address_id);
      const category = await Category.findByPk(offer.category_id);
      const pictures = await pictureRepository.repositoryGetPicturesByOffer(
        offer.id
      );

      const offerDto = {
        id: offer.id,
        label: offer.label,
        description: offer.description,
        display_phone: offer.display_phone,
        display_mail: offer.display_mail,
        state: offer.state,
        owner: {
          user_name: user.full_name,
          phone: offer.display_phone ? user.phone : null,
          mail: offer.display_mail ? user.mail : null,
          note: user.note,
        },
        exchange_address: {
          street: address.street,
          city: address.city,
          zipcode: address.zipcode,
          complement: address.complement,
          number: address.number,
          latitude: address.latitude,
          longitude: address.longitude,
          distance: null,
        },
        category: category.label,
        created_at: offer.created_at,
        pictures: pictures,
      };

      return offerDto;
    } catch (error) {
      const jsonRes = {
        message:
          error.message || "Some error occurred while creating the Dto offer.",
      };
      return jsonRes;
    }
  },
};
