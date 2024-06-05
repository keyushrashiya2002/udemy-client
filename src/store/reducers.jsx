import { combineReducers } from "redux";
import Product from "./product/slice";

const rootReducer = combineReducers({
  Product,
});

export default rootReducer;
