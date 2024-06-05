import { combineReducers } from "redux";
import Product from "./product/slice";
import Category from "./category/slice";

const rootReducer = combineReducers({
  Product,
  Category,
});

export default rootReducer;
