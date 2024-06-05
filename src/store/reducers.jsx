import { combineReducers } from "redux";
import Login from "./auth/login/slice";
import Account from "./auth/register/slice";
import Product from "./product/slice";
import Cart from "./cart/slice";
import Category from "./category/slice";

const rootReducer = combineReducers({
  Login,
  Account,
  Product,
  Cart,
  Category,
});

export default rootReducer;
