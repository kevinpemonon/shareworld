import NsAddress from "./NsAddress";
import NsCategory from "./NsCategory";
import NsUser from "./NsUser";

declare namespace NsOffer {
  export interface IOfferResult {
    results: IResults;
  }

  export interface IResults {
    pagination?: IPagination;
    offers: IOfferData[];
  }

  export interface IOfferData {
    id: number;
    label: string;
    description: string;
    display_phone: boolean;
    display_mail: boolean;
    state: State;
    status: Status;
    exchange_address: NsAddress.IAddress;
    created_at: string;
    pictures: IPictureData[];
    is_owner_address: boolean;
    category_id: number;
    owner: IOwner;
    wanted_by_users?: NsUser.IUserWantedOfferData[];
  }

  export interface IOfferDataIn {
    label: string;
    description: string;
    display_phone: boolean;
    display_mail: boolean;
    state: string;
    exchange_address: NsAddress.IAddress;
    images: string[];
    is_owner_address: boolean;
    category: number;
    owner: number;
  }
  export interface IOwner {
    id: number;
    user_name: string;
    phone: string | null;
    mail: string | null;
    note: number;
    address?: NsAddress.IAddress;
  }

  export interface IPictureData {
    id: number;
    name: string;
    url: string;
  }

  export interface IPagination {
    current_page: number;
    page_size: number;
    total_pages: number;
  }

  export interface IOfferConditionsParams {
    latitude?: number;
    longitude?: number;
    distance?: number;
    search?: string;
    days?: number;
    state?: string[];
    category?: number;
    page_size?: number;
    page_number?: number;
    sort_by?: string;

  }

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
}

export default NsOffer;
