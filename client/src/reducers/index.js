import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  wishlist: wishlistReducer,
  user: userReducer,
});
