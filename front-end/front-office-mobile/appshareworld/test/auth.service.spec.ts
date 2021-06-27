// import { ADD_USER } from './../src/store/actionsTypes';
// import {authService} from '../src/services/auth.service';
// import axios, { AxiosResponse } from "axios";
// import store from '../src/store/reducers';
// import {Dispatch}  from 'redux';

// // ? Default implementation:


// describe('login_service', () => {
//     let mail = "";
//     let password = "";
//     const uri = "http://localhost:3000/auth/login";
//     const uribase = "http://localhost:3000/";
//     const _data = {
//         mail,
//         password
//     }
//     afterEach(() => jest.restoreAllMocks())
//     it('should return 200', async () => {    
//       (axios.post as any) = jest.fn(async () => {})
//       const value = await axios.post(uri, _data, undefined);
//       const waitval = axios.post(
       
//          uribase + "auth/login",
       
//           _data,
//           undefined
       
//       )
//       expect(value).toEqual(value);
//       expect(axios.post).toHaveBeenCalledTimes(2);
//     })
//   })

















