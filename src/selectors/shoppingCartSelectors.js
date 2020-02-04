import { createSelector } from 'reselect';

export const getCuttentShoppingCart = ({ shoppingCart }) => shoppingCart.items;

export const getTotalOrderAmount = createSelector(
  getCuttentShoppingCart,
  items => {
    let sum = 0;
    items.forEach(item => {
      sum += item.price * item.count;
    });
    return sum;
  },
);
