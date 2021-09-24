import axios from "axios";
import {
  GET_ITEMS,
  POST_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING,
} from "./types";
import { getErrors } from "./errorActions";

// getting all the items from the backend

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then((res) => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

//addding the new items

export const postItem = (item) => (dispatch) => {
  axios
    .post("/api/items", item)
    .then((res) =>
      dispatch({
        type: POST_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

// updating the item

export const updateItem = (id, item) => (dispatch) => {
  axios
    .put(`/api/items/${id}`, item)
    .then((res) =>
      dispatch({
        type: UPDATE_ITEM,
        payload: Promise.all([id, res.data]),
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

// deleting the items

export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
