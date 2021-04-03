import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const ORDER_LOADING = "ORDER_LOADING";
export const ORDER_FAILURE = "ORDER_FAILURE";
export const FETCH_ORDER = "FETCH_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const ERROR = "ERROR";

//Fetch order
export const fetchOrder = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    });
    const user = getState().auth.user;
    if (!user._id) {
      return;
    }
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/history`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.accesstoken,
          },
          method: "GET",
        })
      );
      if (!response.ok) {
        dispatch({
          type: ORDER_FAILURE,
        });
        throw new Error("Something went wrong! Can't get your order");
      }
      const resData = await response.json();
      dispatch({
        type: FETCH_ORDER,
        orderData: resData,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Add order
export const addOrder = (carts, fullAddress, phone) => {
  console.log("--------------------");
  const id = Math.floor(Math.random() * (10000000000 - 1000000 + 1) + 1000000);
  console.log(carts);
  console.log(fullAddress);
  console.log(phone);
  return async (dispatch, getState) => {
    dispatch({
      type: ORDER_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/api/payment`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.accesstoken,
          },
          method: "POST",
          body: JSON.stringify({
            cart: carts,
            address: fullAddress,
            phone: phone,
            paymentID: id,
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: ORDER_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: ADD_ORDER,
      });
    } catch (err) {
      throw error;
    }
  };
};
