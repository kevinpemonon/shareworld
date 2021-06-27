import { store } from "./../../App";

// import NsUser from './../models/NsUser';
// import  IUserData  from './../models/NsUser';
import { Address_Complete } from "./../screens/authScreen/SignUp";
const axios = require("axios");

import { Dispatch } from "redux";
// import { useDispatch } from 'react-redux';
import { addUser } from "../store/actionsCreator";
// import { useCallback } from 'react-redux';

// import { BACK_URI } from 'react-native-dotenv';

require("dotenv").config();

const url = "http://localhost:3333/";

// export const signupUser = createAsyncThunk(
//   'auth/register',
/*
 * connect: get token and save to store
 * Args:
 *  mail
 *  password
 * Return: 1 if connected or 0 if not
 */
// Recover Adress request

// ? Login method

async function login_service(
  mail: string,
  password: string,
  dispatch: Dispatch<any>
) {
  // const dispatch: Dispatch<any> = useDispatch();
  console.log(`auth.service -> login_service: mail: ${mail}`);
  console.log(`auth.service -> login_service: password: ${password}`);
  console.log(`auth.service -> login_service: url: ${url + "auth/login"}`);

  const loginrequest = await axios({
    method: "POST",
    url: url + "auth/login",
    data: {
      mail: mail,
      password: password,
    },
  })
    .then((response: any) => {
      console.log("am login_service");
      console.log(response.data);

      if (response.status == 200) {
        console.log("login service in if");

        console.log("login service after dispatch");

        const address: IAddress = {
          street: response.data.address.street,
          city: response.data.address.city,
          zipcode: response.data.address.zipcode,
          complement: response.data.address.complement,
          number: response.data.address.number,
          latitude: response.data.address.latitude,
          longitude: response.data.address.longitude,
        };
        const user: IUser = {
          id: response.data.user.id,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          full_name: response.data.user.full_name,
          phone: response.data.user.phone,
          url_avatar: response.data.user.url_avatar,
          credit: response.data.user.credit,
          mail: response.data.user.mail,
          note: response.data.user.note,
          number_notes: response.data.user.number_notes,
          address: address,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };

        dispatch(addUser(user));
        //  dispatch(displayUser())
        console.log("Display user: ", store.getState().user);
        console.log();

        // window.localStorage.getItem('accesToken');
        console.log("login service SUCCESS");
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
    console.log('HHHHHHHH');
    
console.log(loginrequest);

  return loginrequest;
}

// }
// ? Register method

const register_service = async (
  fistname: string,
  lastname: string,
  phone: string,
  credit: number,
  mail: string,
  password: string,
  address: Address_Complete
) => {
  console.log(url + "auth/register");
  const registerrequest = await axios({
    method: "POST",
    url: url + "auth/register",
    data: {
      first_name: fistname,
      last_name: lastname,
      phone: phone,
      mail: mail,
      password: password,
      status: "active",
      credit: credit,
      street: address.street,
      city: address.city,
      zipcode: address.zipcode,
      complement: address.complement,
      number: address.number,
      latitude: 0,
      longitude: 0,
    },
  })
    .then((response: any) => {
      if (response.status == 200) {
        window.localStorage.setItem("accesToken", response.data);
        console.log(response.data);
        console.log(address.city);
      }
    })
    .catch((error: any) => {
      console.log("not working");
      console.log(error);
    });
    console.log(registerrequest);
    
    return registerrequest;
};

// ? Logout method
const logout_service = () => {
  const logoutrequest = axios({
    method: "POST",
    url: url + "auth/logout",
  })
    .then((disconnect: any) => {
      localStorage.removeItem("accessToken");
      console.log(disconnect);
    })
    .catch((error: any) => {
      console.log("not work");
    });
  //  .post(url + 'auth/logout', {

  //  })
};
// ? Update method

const update_service = () => {
  const updaterequest = axios({
    method: "POST",
    url: url + "auth/update",
  }).then((updateuser: any) => {
    localStorage.setItem("accessToken", updateuser.data);
    console.log(updateuser.data);
  });
};

export const authService = { login_service, register_service, logout_service };
