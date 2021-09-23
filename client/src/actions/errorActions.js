import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// Return the errors that we get in our application

export const getErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// clear the errors

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
