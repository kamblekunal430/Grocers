import {
  GET_CART_ITEMS,
  DELETE_FROM_CART,
  CART_LOADING,
  POST_CART_ITEM,
} from "../actions/types";

const initialState = {
  loading: false,
  cart: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case POST_CART_ITEM:
      return {
        ...state,

        cart: action.payload,
      };
    case DELETE_FROM_CART:
      return {
        ...state,

        cart: action.payload,
      };

    case CART_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
  }
}
