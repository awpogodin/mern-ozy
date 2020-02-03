import { ADD_TO_CART, SET_SHOPPING_CART } from './types';

export const setShoppingCart = shoppingCart => ({
  type: SET_SHOPPING_CART,
  payload: shoppingCart,
});

export const addToCart = item => ({
  type: ADD_TO_CART,
  payload: item,
});
