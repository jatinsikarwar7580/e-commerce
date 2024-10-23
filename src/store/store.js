import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    userData:userReducer
  },
});

export default store;
