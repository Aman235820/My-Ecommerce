import { createSlice ,current} from '@reduxjs/toolkit';
import { emptyUserCart } from '../actions';

const cartSlice = createSlice({
    name: "cartData",
    initialState: {
        cartArray: [],
        checkoutItems: []
    },
    reducers: {
        addProduct(state, action) {
           state.cartArray.push(action.payload);
        },
        removeProduct(state, action) {
             state.cartArray.splice(action.payload , 1);
        },
        updateProductQuantity(state,action){
              let userCart = (current(state.cartArray)).filter(item => item.user==action.payload.userEmailID).map(item=> ({product:item.product , quantity:item.quantity}));
              let productArray = userCart.filter(item=> item.product.id==action.payload.id);
              productArray[0].quantity=action.payload.quantity;
              let index = (current(state.cartArray)).findIndex(obj=> obj.user==action.payload.userEmailID && obj.product.id == action.payload.id);
              state.cartArray.splice(index , 1 ,  { user : action.payload.userEmailID , product : productArray[0].product ,  quantity: productArray[0].quantity});
        },
        addCheckoutItems(state, action){
              (state.checkoutItems).push(action.payload);
        }
    },
    extraReducers(builder){
         builder.addCase(emptyUserCart , (state,action)=>{
                 let cart = (current(state.cartArray)).filter(item => !(item.user == action.payload));
                 state.cartArray = cart;
         });
    }

});

export default cartSlice.reducer;
export const { addProduct , removeProduct , updateProductQuantity , addCheckoutItems} = cartSlice.actions;