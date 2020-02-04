import { createSelector } from 'reselect';

export const getCurrentShoppingCart = ({ shoppingCart }) => shoppingCart.items;

export const getCountOfItems = createSelector(
  getCurrentShoppingCart,
  items => {
    let count = 0;
    items.forEach(item => {
      count += item.count;
    });
    return count;
  },
);


export const getTotalOrderAmount = createSelector(
  getCurrentShoppingCart,
  items => {
    let sum = 0;
    items.forEach(item => {
      sum += item.price * item.count;
    });
    return sum;
  },
);
