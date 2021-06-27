const { mockRequest, mockResponse } = require("../../src/utils/interceptor");
const controller = require("../../src/controllers/OfferController");
const newOfferOwnerAddress = {
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
const newOfferNewAddress = {
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
  it("Should return status code 400 because offerId is null", async () => {
    let req = mockRequest();
    req.params.offerId = null;
    req.body = newOfferOwnerAddress;
    const res = mockResponse();
    const offer = await controller.updateOffer(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.status().json).toBeCalledWith({
      message: "OfferId can not be null",
    });
  });

  it("Should return status code 400 because offerId is 0", async () => {
    let req = mockRequest();
    req.params.offerId = 0;
    req.body = null;
    const res = mockResponse();
    const offer = await controller.updateOffer(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.status().json).toBeCalledWith({
      message: "OfferId can not be 0",
    });
  });

  it("Should return status code 500 because offerId does not exist", async () => {
    let req = mockRequest();
    req.params.offerId = 100;
    req.body = newOfferOwnerAddress;
    const res = mockResponse();
    const offer = await controller.updateOffer(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.status().json).toBeCalledWith({
      message: "Can't get offer to update",
    });
  });

  it("Should return status code 400 because newOffer is null", async () => {
    let req = mockRequest();
    req.params.offerId = 1;
    req.body = null;
    const res = mockResponse();
    const offer = await controller.updateOffer(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.status().json).toBeCalledWith({
      message: "NewOffer can not be null",
    });
  });

  it("Should return status code 200 and the offer address is the same that owner", async () => {
    let req = mockRequest();
    req.params.offerId = 1;
    req.body = newOfferOwnerAddress;
    const res = mockResponse();
    const offer = await controller.updateOffer(req, res);
    expect(res.status).toBeCalledWith(200);
  });

  it("Should return status code 200 and the offer address is different that owner", async () => {
    let req = mockRequest();
    req.params.offerId = 1;
    req.body = newOfferNewAddress;
    const res = mockResponse();
    const offer = await controller.updateOffer(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});

describe("testing deleteOffer", () => {
  it("Should return status code 400 because offerId is null", async () => {
    let req = mockRequest();
    req.params.offerId = null;
    const res = mockResponse();
    const offer = await controller.deleteOffer(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.status().json).toBeCalledWith({
      message: "OfferId can not be null",
    });
  });

  it("Should return status code 400 because offerId is 0", async () => {
    let req = mockRequest();
    req.params.offerId = 0;
    const res = mockResponse();
    const offer = await controller.deleteOffer(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.status().json).toBeCalledWith({
      message: "OfferId can not be 0",
    });
  });

  it("Should return status code 500 because offerId does not exist", async () => {
    let req = mockRequest();
    req.params.offerId = 50;
    const res = mockResponse();
    const offer = await controller.deleteOffer(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.status().json).toBeCalledWith({
      message: "Can't get offer to delete",
    });
  });

  it("Should return status code 200", async () => {
    let req = mockRequest();
    req.params.offerId = 5;
    const res = mockResponse();
    const offer = await controller.deleteOffer(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});

describe("testing getOffersCreatedByUser", () => {
  it("Should return status code 400 because userId is null", async () => {
    let req = mockRequest();
    req.params.userId = null;
    const res = mockResponse();
    const offers = await controller.getOffersCreatedByUser(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.status().json).toBeCalledWith({
      message: "UserId can not be null",
    });
  });

  it("Should return status code 400 because userId is 0", async () => {
    let req = mockRequest();
    req.params.userId = 0;
    const res = mockResponse();
    const offers = await controller.getOffersCreatedByUser(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.status().json).toBeCalledWith({
      message: "UserId can not be 0",
    });
  });

  it("Should return status code 400 because userId is 50", async () => {
    let req = mockRequest();
    req.params.userId = 50;
    const res = mockResponse();
    const offers = await controller.getOffersCreatedByUser(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.status().json).toBeCalledWith({
      message: "This id does not exist or user has not created offers",
    });
  });

  it("Should return status code 200", async () => {
    let req = mockRequest();
    req.params.userId = 1;
    const res = mockResponse();
    const offers = await controller.getOffersCreatedByUser(req, res);
    expect(res.status).toBeCalledWith(200);
  });
});
