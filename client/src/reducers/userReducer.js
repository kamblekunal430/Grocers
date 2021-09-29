import { GET_USERS, DELETE_USER, USERLIST_LOADING } from "../actions/types";

const initialState = {
  loading: false,
  userList: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        userList: action.payload,
        loading: false,
      };

    case DELETE_USER:
      return {
        ...state,
        userList: state.userList.filter((user) => user._id !== action.payload),
      };

    case USERLIST_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}
