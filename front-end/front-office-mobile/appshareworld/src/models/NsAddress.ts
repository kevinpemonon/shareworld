declare namespace NsAddress {
  export interface IAddress {
    id?: number;
    street: string;
    city: string;
    zipcode: string;
    complement: string;
    number: string;
    latitude: number;
    longitude: number;
    distance?: number | null;
  }
}

export default NsAddress;
