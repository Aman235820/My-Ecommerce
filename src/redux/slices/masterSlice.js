import { createSlice } from "@reduxjs/toolkit";
import { setPlacedOrders } from "../actions";

const masterSlice = createSlice({
     name: "masterData",
     initialState: {
          allProducts: [],
          placedOrders: []
     },
     reducers: {
          getAllProducts(state, action) {
               state.allProducts = action.payload;
          }
     },
     extraReducers(builder) {
          builder.addCase(setPlacedOrders, (state, action) => {
               state.placedOrders.push(action.payload);
          })
     }
});

export default masterSlice.reducer;
export const { getAllProducts } = masterSlice.actions;