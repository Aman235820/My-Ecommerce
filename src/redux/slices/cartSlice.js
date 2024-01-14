import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name : "cartData",
    initialState : [],
    reducers : {
        addProduct(state , action){},
        removeProduct(state , action){},
        emptyCart(state , action){}
    }
});

export default cartSlice.reducer;