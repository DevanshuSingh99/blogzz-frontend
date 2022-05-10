export const LOG_IN = "LOG_IN";
export const SIGN_UP = "SIGN_UP";
export const ADD_BLOG = "ADD_BLOG";
export const GET_BLOG = "GET_BLOG";
export const GET_MY_BLOG = "GET_MY_BLOG"
export const WRITE_NEW_BLOG = "WRITE_NEW_BLOG"
export const BLOG_LOGOUT = "BLOG_LOGOUT"
export const USER_LOGOUT = "USER_LOGOUT"
export const GET_TAGS = "GET_TAGS"




// import axios from "axios";
// import Cookies from "universal-cookie";
// import { LOG_IN, SIGN_UP } from "./types";
// //


// const instance = axios.create({
//   baseURL: "http://localhost:7010",
// });

// export const logInUser = (formValues) => async (dispatch) => {
//   const response = await instance.post("/users/login", formValues);

//   dispatch({
//     type: LOG_IN,
//     payload: response.data,
//   });
//   return response.data;
// };

// export const signUpUser = (formValues) => async (dispatch) => {
//   const response = await instance.post("/users", formValues);

//   dispatch({
//     type: SIGN_UP,
//     payload: response.data,
//   });
// };
