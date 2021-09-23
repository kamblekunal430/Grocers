import axios from "axios";
import { getErrors } from "./errorActions";
import {
  GET_CART_ITEMS,
  POST_CART_ITEM,
  DELETE_FROM_CART,
  CART_LOADING,
} from "./types";

// getting cart items
export const getCartItems = (id) => (dispatch) => {
  dispatch(setCartLoading());
  axios
    .get(`/api/cart/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CART_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

// adding items to the cart

export const postCartItem = (id, itemId, quantity) => (dispatch) => {
  axios
    .post(`/api/cart/${id}`, { itemId, quantity })
    .then((res) =>
      dispatch({
        type: POST_CART_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

// deleting item from the cart

export const deleteItem = (userId, itemId) => (dispatch) => {
  axios
    .delete(`/api/cart/${userId}/${itemId}`)
    .then((res) =>
      dispatch({
        type: DELETE_FROM_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const setCartLoading = () => {
  return {
    type: CART_LOADING,
  };
};
