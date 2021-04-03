import { Cart } from "../../models/Cart";
import {
  ADD_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
  INC_CART_QUANTITY,
  DES_CART_QUANTITY,
  RESET_CART,
  CART_LOADING,
  CART_FAILURE,
} from "./cartActions";
import { LOGOUT } from "../auth/authActions";

const emptyCart = {
  items: [],
};
const initialState = {
  cartItems: emptyCart,
  isLoading: false,
};

const findIndex = (cartList, id) => {
  const index = cartList.findIndex((cart) => {
    return cart._id === id;
  });
  return index;
};
export const cartReducer = (state = initialState, action) => {
  const cartList = state.cartItems.items;
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case CART_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_CART:
      return {
        ...state,
        cartItems: action.carts,
        isLoading: false,
      };

    case ADD_CART:
      const id = action.cartItem._id;
      let newItem = new Cart(action.cartItem, 1);
      let itemToSave = { ...newItem.item, quantity: 1 };
      console.log(itemToSave);
      cartList.push(itemToSave);

      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };
    case REMOVE_FROM_CART:
      const { itemId } = action;
      cartList.forEach((item, index) => {
        if (item._id === itemId) {
          carts.items.splice(index, 1);
        }
      });
      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };
    case INC_CART_QUANTITY:
      const { cartItemId } = action;
      const index = findIndex(cartList, cartItemId);
      cartList[index].quantity = +cartList[index].quantity + 1;
      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };
    case DES_CART_QUANTITY:
      const { itemIdCart } = action;
      const indexx = findIndex(cartList, itemIdCart);
      cartList[indexx].quantity = +cartList[indexx].quantity - 1;
      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };
    case RESET_CART:
      state.cartItems.items = [];
      return {
        ...state,
        cartItems: { ...state.cartItems },
        isLoading: false,
      };
    case LOGOUT: {
      return {
        cartItems: emptyCart,
        isLoading: false,
      };
    }
  }
  return state;
};
