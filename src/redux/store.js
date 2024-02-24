import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import masterSlice from "./slices/masterSlice";
import secureLocalStorage from "react-secure-storage";

const reduxSessionKey = 'HVEFJGEFHUJ';

const loadState = () => {
     try {
          const serializedState = secureLocalStorage.getItem(reduxSessionKey);
          if (serializedState == null) {
               return undefined;
          }
          return JSON.parse(decodeURIComponent(serializedState))
     } catch (e) {
          console.log(e);
          return undefined;
     }
}

const saveState = (state) => {
     try {
          let serializedState = encodeURIComponent(JSON.stringify(state));
          secureLocalStorage.setItem(reduxSessionKey, serializedState);
     } catch (e) {
          console.log(e);
     }
}

const preloadedState = loadState();

const store = configureStore({
     reducer: {
          cartItems: cartSlice,
          allProducts: masterSlice,
     },
     preloadedState: preloadedState
});

store.subscribe(() => {
     saveState(store.getState());
});

export default store;