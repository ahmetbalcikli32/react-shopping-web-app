import {combineReducers} from "redux";
import changeCategoryReducer from "./changeCategoryReducer";
import categoryListReducer from "./categoryListReducer";
import productListReducer from "./productListReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    changeCategoryReducer,
    categoryListReducer,
    productListReducer,
    cartReducer,
    authReducer
});

export default rootReducer;