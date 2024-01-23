import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name : "cartData",
    initialState : {
         cartArray : []
    },
    reducers : {
        addProduct(state , action){                                              //action-creators
             state.cartArray = action.payload;
        },                                
        removeProduct(state , action){},
        emptyCart(state , action){}
    }
});

export default cartSlice.reducer;
export const {addProduct} = cartSlice.actions;