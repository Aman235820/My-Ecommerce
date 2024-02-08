import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cartData",
    initialState: {
        cartArray: []
    },
    reducers: {
        addProduct(state, action) {
           state.cartArray.push(action.payload);
        },
        removeProduct(state, action) {
             state.cartArray.splice(action.payload , 1);
        },
        updateProductQuantity(state,action){
              
        },
        emptyCart(state, action) { }
    }
});

export default cartSlice.reducer;
export const { addProduct , removeProduct , updateProductQuantity} = cartSlice.actions;