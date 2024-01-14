import {configureStore} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

const store = configureStore({
     reducer:{
         cartItems :  cartSlice
     }
});

export default store;