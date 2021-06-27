import NsOffer from "../models/NsOffer";
import NsUser from "../models/NsUser";

enum Status {
  EnCours = "En cours(ouverte)",
  Donne = "Donné(fermée)",
  Bannie = "Bannie(fermée)",
}

enum State {
  CommeNeuf = "Comme neuf",
  BonEtat = "Bon état",
  EtatMoyen = "État Moyen",
  ABricoler = "À bricoler",
}

export const initOffer = (): NsOffer.IOfferData => {
  const offer: NsOffer.IOfferData = {
    id: 0,
    label: "",
    description: "",
    display_mail: false,
    display_phone: false,
    exchange_address: {
      number: "0",
      street: "",
      city: "",
      complement: "",
      longitude: 0,
      latitude: 0,
      distance: 0,
      zipcode: "",
    },
    status: Status.EnCours,
    state: State.CommeNeuf,
    // category: {
    //   id: 1,
    //   label: "Informatique",
    //   image_url: "",
    // },
    owner: {
      id: 0,
      user_name: "",
      mail: "",
      note: 0,
      phone: "",
    },
    created_at: "",
    pictures: [],
    wanted_by_users: [],
    is_owner_address: false,
    category_id: 0,
  };
  return offer;
};


