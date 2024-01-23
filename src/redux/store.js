import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import masterSlice from "./slices/masterSlice";
const store = configureStore({
     reducer:{
         cartItems :  cartSlice,
         allProducts : masterSlice
     }
});

export default store;