import axios from "axios";
import { getErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({
    type: USER_LOADING,
  });

  axios
    .get("/api/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(getErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// register the user
export const register =
  ({ name, email, password }) =>
  (dispatch) => {
    // set header as json
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // request body
    const body = JSON.stringify({ name, email, password });

    axios
      .post("/api/register", body, config)
      .then((res) =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          getErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({ type: REGISTER_FAIL });
      });
  };

// user login

export const login =
  ({ email, password }) =>
  (dispatch) => {
    //header
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // request body
    const body = JSON.stringify({ email, password });

    axios
      .post("/api/login", body, config)
      .then((res) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          getErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };

// logout user

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setting up config/headers and token

export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = getState().auth.token;

  // set header
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // adding token to headers

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
