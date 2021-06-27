declare namespace NsUser {
  export interface IUserWantedOfferData {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    mail: string;
    note: string;
    validate_by_owner: boolean;
    validate_by_aquirer: boolean;
  }
}

export default NsUser;
