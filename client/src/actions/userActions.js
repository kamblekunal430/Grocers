import axios from "axios";
import { getErrors } from "./errorActions";
import { USERLIST_LOADING, GET_USERS, DELETE_USER } from "./types";

// getting users from the server/backend
export const getUsers = () => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .get(`/api/users`)
    .then((res) =>
      dispatch({
        type: GET_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

// deleting the user
export const deleteUser = (userId) => (dispatch) => {
  axios
    .delete(`/api/users/${userId}`)
    .then((res) =>
      dispatch({
        type: DELETE_USER,
        payload: userId,
      })
    )
    .catch((err) =>
      dispatch(getErrors(err.response.data, err.response.status))
    );
};

export const setUserLoading = () => {
  return {
    type: USERLIST_LOADING,
  };
};
