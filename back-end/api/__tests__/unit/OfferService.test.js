const offerService = require("../../src/services/OfferService");
const offerRepository = require("../../src/repositories/UserRepository");
const AddressRepository = require("../../src/repositories/AddressRepository");

const newOfferWithOwnerAddress = {
  id: 1,
  label: "Guitare Folk A",
  description: "Il manque les cordes",
  display_phone: true,
  display_mail: true,
  state: "Bon état",
  status: "En cours(ouverte)",
  created_at: "2021-03-10T00:00:00.000Z",
  is_owner_address: true,
  category_id: 7,

  owner: {
    id: 1,
    address: {
      id: 1,
      street: "Rue Condorcet",
      city: "Villejuif",
      zipcode: "94800",
      complement: "",
      number: 5,
      latitude: "48.79830169678",
      longitude: "2.36831855774",
      createdAt: "2021-10-03T00:00:00.000Z",
      updatedAt: "2021-10-03T00:00:00.000Z",
    },
  },
  exchange_address: {
    id: 1,
    street: "Rue Condorcet",
    city: "Villejuif",
    zipcode: "94800",
    complement: "",
    number: 5,
  },
  pictures: [
    {
      id: 2,
      name: "guitare2",
      url: "offers/guitare2.jpg",
      createdAt: "2021-03-10T00:00:00.000Z",
      updatedAt: "2021-03-10T00:00:00.000Z",
      offer_id: 1,
    },
    {
      id: 1,
      name: "guitare1",
      url: "offers/guitare1.jpg",
      createdAt: "2021-03-10T00:00:00.000Z",
      updatedAt: "2021-03-10T00:00:00.000Z",
      offer_id: 1,
    },
  ],
};
const newOfferWithNewAddress = {
  id: 1,
  label: "Guitare Folk A",
  description: "Il manque les cordes",
  display_phone: true,
  display_mail: true,
  state: "Bon état",
  status: "En cours(ouverte)",
  created_at: "2021-03-10T00:00:00.000Z",
  is_owner_address: false,
  category_id: 7,
  wanted_by_users: [
    {
      id: 2,
      first_name: "Mathias",
      last_name: "Dugamin",
      phone: "0725285454",
      mail: "mathias.dugamin@gmail.com",
      note: "2.1",
      user_want_offers: [Object],
    },
    {
      id: 3,
      first_name: "Bob",
      last_name: "Marley",
      phone: "0645983236",
      mail: "bob.marley@gmail.com",
      note: "4.9",
      user_want_offers: [Object],
    },
  ],
  owner: {
    id: 1,
    address: {
      id: 1,
      street: "Rue Condorcet",
      city: "Villejuif",
      zipcode: "94800",
      complement: "",
      number: 5,
      latitude: "48.79830169678",
      longitude: "2.36831855774",
      createdAt: "2021-10-03T00:00:00.000Z",
      updatedAt: "2021-10-03T00:00:00.000Z",
    },
  },
  exchange_address: {
    id: 1,
    street: "Rue Condorcet",
    city: "Villejuif",
    zipcode: "94800",
    complement: "",
    number: 50,
  },
  pictures: [
    {
      id: 2,
      name: "guitare2",
      url: "offers/guitare2.jpg",
      createdAt: "2021-03-10T00:00:00.000Z",
      updatedAt: "2021-03-10T00:00:00.000Z",
      offer_id: 1,
    },
    {
      id: 1,
      name: "guitare1",
      url: "offers/guitare1.jpg",
      createdAt: "2021-03-10T00:00:00.000Z",
      updatedAt: "2021-03-10T00:00:00.000Z",
      offer_id: 1,
    },
  ],
};
const newOfferWithOwnerAddressAndDeleteOldOfferAddress = {
  id: 1,
  label: "Guitare Folk A",
  description: "Il manque les cordes",
  display_phone: true,
  display_mail: true,
  state: "Bon état",
  status: "En cours(ouverte)",
  created_at: "2021-03-10T00:00:00.000Z",
  is_owner_address: true,
  category_id: 7,
  wanted_by_users: [
    {
      id: 2,
      first_name: "Mathias",
      last_name: "Dugamin",
      phone: "0725285454",
      mail: "mathias.dugamin@gmail.com",
      note: "2.1",
      user_want_offers: [Object],
    },
    {
      id: 3,
      first_name: "Bob",
      last_name: "Marley",
      phone: "0645983236",
      mail: "bob.marley@gmail.com",
      note: "4.9",
      user_want_offers: [Object],
    },
  ],
  owner: {
    id: 1,
    address: {
      id: 1,
      street: "Rue Condorcet",
      city: "Villejuif",
      zipcode: "94800",
      complement: "",
      number: 5,
      latitude: "48.79830169678",
      longitude: "2.36831855774",
      createdAt: "2021-10-03T00:00:00.000Z",
      updatedAt: "2021-10-03T00:00:00.000Z",
    },
  },
  exchange_address: {
    id: 6,
    street: "Rue Condorcet",
    city: "Villejuif",
    zipcode: "94800",
    complement: "",
    number: 50,
  },
  pictures: [
    {
      id: 2,
      name: "guitare2",
      url: "offers/guitare2.jpg",
      createdAt: "2021-03-10T00:00:00.000Z",
      updatedAt: "2021-03-10T00:00:00.000Z",
      offer_id: 1,
    },
    {
      id: 1,
      name: "guitare1",
      url: "offers/guitare1.jpg",
      createdAt: "2021-03-10T00:00:00.000Z",
      updatedAt: "2021-03-10T00:00:00.000Z",
      offer_id: 1,
    },
  ],
};
const newOfferWithNewAddressAndDeleteOldOfferAddress = {
  id: 1,
  label: "Guitare Folk A",
  description: "Il manque les cordes",
  display_phone: true,
  display_mail: true,
  state: "Bon état",
  status: "En cours(ouverte)",
  created_at: "2021-03-10T00:00:00.000Z",
  is_owner_address: false,
  category_id: 7,
  wanted_by_users: [
    {
      id: 2,
      first_name: "Mathias",
      last_name: "Dugamin",
      phone: "0725285454",
      mail: "mathias.dugamin@gmail.com",
      note: "2.1",
      user_want_offers: [Object],
    },
    {
      id: 3,
      first_name: "Bob",
      last_name: "Marley",
      phone: "0645983236",
      mail: "bob.marley@gmail.com",
      note: "4.9",
      user_want_offers: [Object],
    },
  ],
  owner: {
    id: 1,
    address: {
      id: 1,
      street: "Rue Condorcet",
      city: "Villejuif",
      zipcode: "94800",
      complement: "",
      number: 5,
      latitude: "48.79830169678",
      longitude: "2.36831855774",
      createdAt: "2021-10-03T00:00:00.000Z",
      updatedAt: "2021-10-03T00:00:00.000Z",
    },
  },
  exchange_address: {
    id: 1,
    street: "Rue Condorcet",
    city: "Villejuif",
    zipcode: "94800",
    complement: "",
    number: 50,
  },
  pictures: [
    {
      id: 2,
      name: "guitare2",
      url: "offers/guitare2.jpg",
      createdAt: "2021-03-10T00:00:00.000Z",
      updatedAt: "2021-03-10T00:00:00.000Z",
      offer_id: 1,
    },
    {
      id: 1,
      name: "guitare1",
      url: "offers/guitare1.jpg",
      createdAt: "2021-03-10T00:00:00.000Z",
      updatedAt: "2021-03-10T00:00:00.000Z",
      offer_id: 1,
    },
  ],
};

describe("testing updateOffer", () => {
  it("Updated offer must have id 1", async () => {
    const result = await offerService.serviceUpdateOffer(
      1,
      newOfferWithOwnerAddress
    );
    const newOffer = result[0][0];
    expect(newOffer.id).toBe(1);
  });

  it("Offer should have the same address that owner and old address of offer does not must be deleted", async () => {
    const result = await offerService.serviceUpdateOffer(
      1,
      newOfferWithOwnerAddress
    );
    const newOffer = result[0][0];
    const ownerAddress = await offerRepository.getOwnerAddressId(
      newOffer.owner_id
    );
    const addressOldOffer = await AddressRepository.getAddressById(
      newOfferWithOwnerAddress.exchange_address.id
    );
    expect(newOffer.is_owner_address).toBe(true);
    expect(newOffer.exchange_address_id).toBe(ownerAddress[0].address_id);
    expect(addressOldOffer.length).toBe(1);
    expect(addressOldOffer[0].id).toBe(newOffer.exchange_address_id);
  });

  //   it("Offer should have the same address that owner and old adress of offer must be deleted", async () => {
  //     const result = await offerService.serviceUpdateOffer(
  //       1,
  //       newOfferWithOwnerAddressAndDeleteOldOfferAddress
  //     );
  //     const newOffer = result[0][0];
  //     const ownerAddress = await offerRepository.getOwnerAddressId(
  //       newOffer.owner_id
  //     );
  //     const addressOldOffer = await AddressRepository.getAddressById(
  //       newOfferWithOwnerAddressAndDeleteOldOfferAddress.exchange_address.id
  //     );
  //     expect(newOffer.is_owner_address).toBe(true);
  //     expect(newOffer.exchange_address_id).toBe(ownerAddress[0].address_id);
  //     expect(addressOldOffer.length).toBe(0);
  //   });

  it("Offer should not have the same address that owner and old address of offer does not must be deleted", async () => {
    const result = await offerService.serviceUpdateOffer(
      1,
      newOfferWithNewAddress
    );
    const newOffer = result[0][0];
    const ownerAddress = await offerRepository.getOwnerAddressId(
      newOffer.owner_id
    );
    expect(newOffer.is_owner_address).toBe(false);
    expect(newOffer.exchange_address_id).not.toBe(ownerAddress[0].address_id);
  });

  //   it("Offer should not have the same address that owner and ", async () => {
  //     const result = await offerService.serviceUpdateOffer(
  //       1,
  //       newOfferWithNewAddressAndDeleteOldOfferAddress
  //     );
  //     const newOffer = result[0][0];
  //     const ownerAddress = await offerRepository.getOwnerAddressId(
  //       newOffer.owner_id
  //     );
  //     expect(newOffer.is_owner_address).toBe(false);
  //     expect(newOffer.exchange_address_id).not.toBe(ownerAddress[0].address_id);
  //   });
});

describe("testing deleteOffer", () => {
  it("", async () => {});
});

describe("testing getOffersCreatedByUser", () => {
  it("Should return an array of 3 offers", async () => {
    const result = await offerService.serviceGetOffersCreatedByUser(1);
    console.log(result);
    expect(result.offers.length).toBe(3);
  });
});
