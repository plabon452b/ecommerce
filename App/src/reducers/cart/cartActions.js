import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const CART_LOADING = "CART_LOADING";
export const CART_FAILURE = "CART_FAILURE";
export const FETCH_CART = "FETCH_CART";
export const ADD_CART = "ADD_CART";
export const RESET_CART = "RESET_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DES_CART_QUANTITY = "DES_CART_QUANTITY";
export const INC_CART_QUANTITY = "INC_CART_QUANTITY";
let carts;
//Fetch Cart
export const fetchCart = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;

    if (user._id != undefined) {
      dispatch({
        type: CART_LOADING,
      });
      try {
        const response = await timeoutPromise(
          fetch(`${API_URL}/user/infor`, {
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
            type: CART_FAILURE,
          });
          throw new Error("Something went wrong!, can't get your carts");
        }
        const resData = await response.json();
        carts = { items: resData.cart };
        dispatch({
          type: FETCH_CART,
          carts,
        });
      } catch (err) {
        throw err;
      }
    }
    return;
  };
};
//Add Add to Cart
export const addToCart = (item) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/addcart`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.accesstoken,
          },
          method: "PATCH",

          body: JSON.stringify({
            cart: [
              ...carts.items,
              {
                ...item,
                quantity: 1,
              },
            ],
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: "ADD_CART",
        cartItem: item,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Remove from Cart
export const removeFromCart = (cartId, itemId) => {
  carts.items.forEach((item, index) => {
    if (item._id === itemId) {
      carts.items.splice(index, 1);
    }
  });

  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/addcart`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.accesstoken,
          },
          method: "PATCH",
          body: JSON.stringify({
            cart: carts.items,
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: "REMOVE_FROM_CART",
        itemId,
      });
    } catch (err) {
      throw err;
    }
  };
};
//increase cart quantity
export const incCartQuantity = (itemId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "INC_CART_QUANTITY",
      cartItemId: itemId,
    });
  };
};
//Decrease cart quantity
export const decCartQuantity = (itemId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "DES_CART_QUANTITY",
      itemIdCart: itemId,
    });
  };
};

//Reset Cart
export const resetCart = (cartId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/addcart`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.accesstoken,
          },
          method: "PATCH",
          body: JSON.stringify({
            cart: [],
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: CART_FAILURE,
        });
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: "RESET_CART",
      });
    } catch (err) {
      throw err;
    }
  };
};
