const Offer = require("../models/Offer");
const PictureOffer = require("../models/PictureOffer");
const User = require("../models/User");
const Address = require("../models/Address");
const Category = require("../models/Category");
const offerRepository = require("../repositories/OfferRepository");
const addressRepository = require("../repositories/AddressRepository");
const userRepository = require("../repositories/UserRepository");
const dateHelpers = require("../helpers/dateHelpers");
const haversine = require("../helpers/haversine");
const numbers = require("../helpers/numbers");
const OfferDto = require("../Dto/OfferDto");
const NodeGeocoder = require("node-geocoder");

module.exports = {
  async getAllOffers() {
    const offers = await Offer.findAll();

    const offerResults = await Promise.all(
      offers.map(async (offr) => {
        const offerDtoOut = await OfferDto.OfferToDto(offr);
        return offerDtoOut;
      })
    );

    return offerResults;
  },

  async getOffer(id) {
    try {
      const offer = await Offer.findByPk(id);

      if (offer == null) {
        return null;
      }

      const offerDto = await OfferDto.OfferToDto(offer);
      return offerDto;
    } catch (error) {
      const jsonRes = {
        message:
          error.message || "Some error occurred while searching the offer.",
      };
      return jsonRes;
    }
  },

  async getOffersByDateAndLocal(date, local) {
    const jsonEx = {
      local: local,
      date: date,
    };
    return jsonEx;
  },

  /**
   * Create an offer
   * @param {*} offer Object
   * {
   *      label: String,
   *      description: String,
   *      display_phone: Boolean
   *      display_mail: Boolean
   *      state: String
   *      owner_id: INTEGER
   *      is_owner_address: Boolean
   *      exchange_address: Object
   *      category_id: INTEGER
   *      images: DataFile[]
   * }
   * @param {*} files images: DataFile[]
   * @param {*} baseUrl String
   * @returns
   */
  async serviceCreateOffer(offer, files, baseUrl) {
    // const addressOffer = JSON.parse(offer.exchange_address);
    const addressOffer = offer.exchange_address;
    var address = await Address.findByPk(addressOffer.id);

    if (address === null) {
      const newAdress = {
        street: addressOffer.street,
        city: addressOffer.city,
        zipcode: addressOffer.zipcode,
        complement: addressOffer.complement,
        number: addressOffer.number,
        latitude: addressOffer.latitude,
        longitude: addressOffer.longitude,
      };

      // Create a new adress
      address = await Address.create(newAdress);
    }

    const product = {
      label: offer.label,
      description: offer.description,
      display_phone: offer.display_phone ? offer.display_phone : 0,
      display_mail: offer.display_mail ? offer.display_mail : 0,
      state: offer.state,
      status: "En cours(ouverte)",
      owner_id: offer.owner_id,
      exchange_address_id: address.id,
      category_id: offer.category_id,
      is_owner_address: offer.is_owner_address ? offer.is_owner_address : 0,
    };

    // Checks the conditions
    const owner = await User.findByPk(product.owner_id);

    const category = await Category.findByPk(product.category_id);

    if (owner !== null && address !== null && category !== null) {
      try {
        // Create offer
        const offer = await Offer.create(product);

        const urls = [];
        const pictures = [];

        if (files && files.length > 0) {
          files.forEach((e, i) => {
            urls.push(`${baseUrl}/${e.filename}`);
            pictures.push({
              name: `${product.label} ${i + 1}`,
              url: `${baseUrl}/${e.filename}`,
              offer_id: offer.id,
            });
          });

          // Create images
          const pictureOffer = await PictureOffer.bulkCreate(pictures);
        }

        if (
          offer === null
          // || pictureOffer === null
        ) {
          return null;
        }

        //  return success message;
        const offerDto = await OfferDto.OfferToDto(offer);
        return offerDto;
      } catch (error) {
        const jsonRes = {
          message:
            error.message || "Some error occurred while creating the offer.",
        };
        return jsonRes;
      }
    }
    return null;
  },

  /**
   * Search Offer
   * @param {Object} params search, category, state[], days, distance(Km), latitude, longitude, page_size, page_number, sort_by
   * @returns Json
   */
  async serviceSearchOffer(params) {
    const search =
      params.search && params.search.trim().length > 0
        ? params.search.trim()
        : false;
    const category = Number.isInteger(parseInt(params.category))
      ? parseInt(params.category)
      : false;

    var states =
      Array.isArray(params.state) && params.state.length > 0
        ? params.state
        : false;

    if (states) {
      states = states.map((st) => {
        return st.trim();
      });
    }

    const date = Number.isInteger(parseInt(params.days))
      ? dateHelpers.getDateBeforeDays(parseInt(params.days))
      : false;

    const page_number = Number.isInteger(parseInt(params.page_number))
      ? parseInt(params.page_number)
      : false;

    const page_size = Number.isInteger(parseInt(params.page_size))
      ? parseInt(params.page_size)
      : false;

    const sort =
      params.sort_by && params.sort_by.trim().length > 0
        ? params.sort_by.trim()
        : false;

    const offset =
      page_number && page_size ? (page_number - 1) * page_size : false;

    const distance = Number.isInteger(parseInt(params.distance))
      ? parseInt(params.distance)
      : false;
    const latitude = numbers.isFloat(parseFloat(params.latitude))
      ? parseFloat(params.latitude)
      : false;
    const longitude = numbers.isFloat(parseFloat(params.longitude))
      ? parseFloat(params.longitude)
      : false;

    // Params condtions
    const conditions = {
      search: search,
      category: category,
      state: states,
      created_date: date,
      distance: distance,
      lat: latitude,
      long: longitude,
      limit: page_size,
      offset: offset,
      sort_by: sort,
    };

    const pointA = {
      longitude: longitude,
      latitude: latitude,
    };

    try {
      const offers = await offerRepository.repositorySearchOffers(conditions);
      const countOffers = await offerRepository.repositoryCountSearchOffers(
        conditions
      );

      if (offers === null || countOffers === null) {
        return null;
      }

      const totalOffers = parseInt(countOffers[0].count);

      const offerResults = await Promise.all(
        offers.map(async (offr) => {
          var pointB = {
            latitude: parseFloat(offr.latitude),
            longitude: parseFloat(offr.longitude),
          };

          const offerDtoOut = await OfferDto.OfferToDto(offr);

          offerDtoOut.exchange_address.distance =
            latitude && longitude
              ? await haversine.getDistanceBetween2Points(pointA, pointB)
              : null;

          return offerDtoOut;
        })
      );

      const results = {};

      // Pagination info
      results.pagination = {
        current_page: page_number && offset ? page_number : 1,
        page_size: page_size ? page_size : 0,
        total_pages:
          totalOffers && page_size ? Math.ceil(totalOffers / page_size) : 0,
      };

      results.results = {
        offers: offerResults,
      };

      return results;
    } catch (error) {
      const jsonRes = {
        message:
          error.message || "Some error occurred while searching the offers.",
      };

      return jsonRes;
    }
  },

  async serviceUpdateOffer(_id, newOffer) {
    const result = await offerRepository.repositoryGetOfferById(_id);
    if (result.length === 0) {
      return { offer: null, message: "Can't get offer to update" };
    }
    const oldAddressId = newOffer.exchange_address.id;

    if (newOffer.is_owner_address) {
      const offer = await offerRepository.repositoryUpdateOffer(
        _id,
        newOffer,
        newOffer.owner.address.id
      );
      // DESTROY OLD ADDRESS OF OFFER IF IS NOT ADDRESS OF OWNER
      if (newOffer.owner.address.id !== newOffer.exchange_address.id) {
        await addressRepository.deleteAddress(oldAddressId);
      }
      return offer;
    } else {
      // CREATE NEW ADDRESS
      const geocoder = NodeGeocoder({
        provider: "openstreetmap",
      });
      const address =
        newOffer.exchange_address.number.toString() +
        " " +
        newOffer.exchange_address.street +
        " " +
        newOffer.exchange_address.city;
      const coord = await geocoder.geocode(address.toLowerCase());
      const newAddress = await addressRepository.createAddress(
        newOffer.exchange_address,
        coord
      );

      // UPDATE ATTRIBUTES OF OFFER
      newOffer.is_owner_address = false;

      const offer = await offerRepository.repositoryUpdateOffer(
        _id,
        newOffer,
        newAddress[0][0].id
      );

      // DESTROY OLD ADDRESS IF IS NOT ADDRESS OF OWNER
      const reqOwnerAddressId = await userRepository.getOwnerAddressId(
        newOffer.owner.id
      );
      const ownerAddressId = reqOwnerAddressId[0].address_id;
      if (oldAddressId !== ownerAddressId) {
        await addressRepository.deleteAddress(oldAddressId);
      }

      return offer;
    }
  },

  async serviceDeleteOffer(offerId) {
    const resultOffer = await offerRepository.repositoryGetOfferById(offerId);
    if (resultOffer.length === 0) {
      return { success: 0, message: "Can't get offer to delete" };
    }
    const offer = resultOffer[0];
    const deleteOffer = await offerRepository.repositoryDeleteOffer(offerId);
    if (!offer.is_owner_address) {
      const addressId = offer.exchange_address_id;
      await addressRepository.deleteAddress(addressId);
    }
    return { success: 1, message: "Offer with id " + offerId + " is deleted" };
  },

  async serviceGetOffersCreatedByUser(userId) {
    const offers = await offerRepository.repositoryGetOffersCreatedByUser(
      userId
    );
    if (offers.length === 0) {
      return {
        offers: [],
        message: "This id does not exist or user has not created offers",
      };
    }
    return {
      offers: offers,
      message: "Offers created by user " + userId,
    };
  },
};
