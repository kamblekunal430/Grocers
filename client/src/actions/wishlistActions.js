import axios from "axios";
import { getErrors } from "./errorActions";
import {
  GET_WISHLIST_ITEMS,
  POST_WISHLIST_ITEM,
  DELETE_FROM_WISHLIST,
  WISHLIST_LOADING,
} from "./types";

// getting wishlist items
export const getWishlistItems = (id) => (dispatch) => {
  dispatch(setWishlistLoading());
  axios
    .get(`/api/wishlist/${id}`)
    .then((res) =>
      dispatch({
        type: GET_WISHLIST_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

// adding items to the wishlist

export const postWishlistItem = (id, itemId) => (dispatch) => {
  axios
    .post(`/api/wishlist/${id}`, { itemId })
    .then((res) =>
      dispatch({
        type: POST_WISHLIST_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

// deleting item from the wishlist

export const deleteWishlistItem = (userId, itemId) => (dispatch) => {
  axios
    .delete(`/api/wishlist/${userId}/${itemId}`)
    .then((res) =>
      dispatch({
        type: DELETE_FROM_WISHLIST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const setWishlistLoading = () => {
  return {
    type: WISHLIST_LOADING,
  };
};
