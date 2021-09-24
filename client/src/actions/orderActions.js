import axios from "axios";
import { getErrors } from "./errorActions";
import { GET_ORDERS, POST_ORDER, ORDERS_LOADING } from "./types";

export const getOrders = (id) => (dispatch) => {
  dispatch(setOrdersLoading());
  axios
    .get(`/api/order/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const postOrder = (id, source) => (dispatch) => {
  axios
    .post(`/api/order/${id}`, { source })
    .then((res) =>
      dispatch({
        type: POST_ORDER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING,
  };
};
