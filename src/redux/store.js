import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import masterSlice from "./slices/masterSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
     key:"ecommerce-root",
     version : 1,
     storage
}

const allReducers = combineReducers({
    cartItems :  cartSlice,
    allProducts : masterSlice,
});

const persistedReducer = persistReducer(persistConfig , allReducers);

const store = configureStore({
     reducer: persistedReducer,
});

export default store;