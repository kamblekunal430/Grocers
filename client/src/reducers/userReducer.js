import { GET_USERS, DELETE_USER, USER_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  users: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}
