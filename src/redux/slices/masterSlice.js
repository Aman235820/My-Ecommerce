import { createSlice } from "@reduxjs/toolkit";

const masterSlice = createSlice({
     name : "masterData",
     initialState : {
          allProducts : []
     },
     reducers : {
          getAllProducts(state , action){
                 state.allProducts = action.payload;
          }
     }
});

export default masterSlice.reducer;
export const {getAllProducts} = masterSlice.actions;