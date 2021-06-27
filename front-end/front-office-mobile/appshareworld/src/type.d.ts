
interface IAddress{
    street: string;
    city: string;
    zipcode: string;
    complement: string;
    number: number;
    latitude: number;
    longitude: number;
    // distance: number | null;
}

interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    phone: string;
    url_avatar: string;
    credit: number;
    mail: string;
    note: number;
    number_notes: number;
    address: IAddress | null;
    accessToken: string;
    refreshToken: string;
}

type UserState = {
    user: IUser;
}
// ! actionTypes
type UserAction = {
    type: string;
    user: IUser;
}

type DispatchType = (args: UserAction) => UserAction;

