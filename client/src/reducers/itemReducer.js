import {
  GET_ITEMS,
  POST_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case POST_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case UPDATE_ITEM:
      const { id, data } = action.payload;
      return {
        ...state,
        items: state.items.forEach((item) => {
          if (item._id === id) {
            item = data;
          }
        }),
      };
    case ITEMS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}
