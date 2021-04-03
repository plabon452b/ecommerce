import { API_URL } from "../../utils/Config";
import { timeoutPromise } from "../../utils/Tools";
export const FAVORITE_LOADING = "FAVORITE_LOADING";
export const FAVORITE_FAILURE = "FAVORITE_FAILURE";
export const FETCH_FAVORITE = "FETCH_FAVORITE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
let favourites;
//Fetch Favorite
export const fetchFavorite = () => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    if (user._id != undefined) {
      dispatch({
        type: FAVORITE_LOADING,
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
            type: FAVORITE_FAILURE,
          });
          throw new Error("Something went wrong!, can't get favorite list");
        }
        const resData = await response.json();
        favourites = resData.favourites;
        console.log(favourites);

        dispatch({
          type: FETCH_FAVORITE,
          favoriteList: favourites,
        });
      } catch (err) {
        throw err;
      }
    }
    return;
  };
};
//Add Favorite
export const addFavorite = (item) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FAVORITE_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/addFavourites`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.accesstoken,
          },
          method: "PATCH",
          body: JSON.stringify({
            favourites: [...favourites, item],
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: FAVORITE_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: ADD_FAVORITE,
        addItem: item,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const removeFavorite = (id) => {
  favourites.forEach((item, index) => {
    if (item._id === id) {
      favourites.splice(index, 1);
    }
  });
  return async (dispatch, getState) => {
    dispatch({
      type: FAVORITE_LOADING,
    });
    const user = getState().auth.user;
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/addFavourites`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: user.accesstoken,
          },
          method: "PATCH",
          body: JSON.stringify({
            favourites: favourites,
          }),
        })
      );
      if (!response.ok) {
        dispatch({
          type: FAVORITE_FAILURE,
        });
        throw new Error("Something went wrong!");
      }
      dispatch({
        type: REMOVE_FAVORITE,
        itemId: id,
      });
    } catch (err) {
      throw err;
    }
  };
};
