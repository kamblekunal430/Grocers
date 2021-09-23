import {
  GET_WISHLIST_ITEMS,
  POST_WISHLIST_ITEM,
  DELETE_FROM_WISHLIST,
  WISHLIST_LOADING,
} from "../actions/types";

const initialState = {
  loading: false,
  wishlist: null,
};

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WISHLIST_ITEMS:
      return {
        ...state,
        loading: false,
        wishlist: action.payload,
      };
    case POST_WISHLIST_ITEM:
      return {
        ...state,
        wishlist: action.payload,
      };
    case DELETE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };

    case WISHLIST_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}
