import { AsyncStorage } from "react-native";
import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";

export const AUTH_LOADING = "AUTH_LOADING";
export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const LOGOUT = "LOGOUT";
export const EDIT_INFO = "EDIT_INFO ";
export const UPLOAD_PROFILEPIC = "UPLOAD_PROFILEPIC";
export const FORGET_PASSWORD = "FORGET_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_ERROR = "RESET_ERROR";

import AskingExpoToken from "../../components/Notification/AskingNotiPermission";

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    })
  );
};

export const SignUp = (name, email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/register`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.msg);
      }
      dispatch({
        type: SIGN_UP,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Login
export const Login = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/login`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        })
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.msg);
      }
      const resData = await response.json();

      const { user, accesstoken } = resData;
      const userToSave = { ...user, ...{ accesstoken: accesstoken } };
      saveDataToStorage("user", userToSave);
      dispatch(setLogoutTimer(60 * 60 * 1000));
      dispatch({
        type: LOGIN,
        user: userToSave,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const EditInfo = (name, phone, address) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/update`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.accesstoken,
          },
          method: "POST",
          body: JSON.stringify({
            name: name,
            phone: phone,
            address: address,
          }),
        })
      );

      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        Error(errorResData.err);
      }

      dispatch({
        type: EDIT_INFO,
        name,
        phone,
        address,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Logout
export const Logout = () => {
  return (dispatch) => {
    clearLogoutTimer(); //clear setTimeout when logout
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("user_token");

    dispatch({
      type: LOGOUT,
      user: {},
    });
  };
};

//Auto log out
let timer;
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(async () => {
      await dispatch(Logout());
      alert("Logout section expired");
    }, expirationTime);
  };
};
