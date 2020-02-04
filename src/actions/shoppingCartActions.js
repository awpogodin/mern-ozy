import { PUSH_ITEMS_TO_CART, SET_SHOPPING_CART } from './types';

export const setShoppingCart = shoppingCart => ({
  type: SET_SHOPPING_CART,
  payload: shoppingCart,
});

export const pushItemsToCart = items => ({
  type: PUSH_ITEMS_TO_CART,
  payload: items,
});

export const AddItemToCart = (newItem, cart) => dispatch => {
  const { items } = cart;
  let isExist = false;
  items.forEach(cartItem => {
    if (cartItem.id === newItem.id) isExist = true;
  });
  if (isExist) {
    const updatedItems = items.map(cartItem => {
      if (cartItem.id === newItem.id) {
        const count = cartItem.count + 1;
        return { ...cartItem, count };
      }
      return cartItem;
    });
    console.log(updatedItems);
    dispatch(pushItemsToCart(updatedItems));
  } else {
    const updatedItems = [
      ...items,
      { ...newItem, count: 1 },
    ];
    dispatch(pushItemsToCart(updatedItems));
  }
};

export const removeItemFromCart = (removableItem, cart) => dispatch => {
  const { items } = cart;
  let countOfItems = 0;
  items.forEach(cartItem => {
    if (cartItem.id === removableItem.id) countOfItems = cartItem.count;
  });
  if (countOfItems > 1) {
    const updatedItems = items.map(cartItem => {
      if (cartItem.id === removableItem.id) {
        const count = cartItem.count - 1;
        return { ...cartItem, count };
      }
      return cartItem;
    });
    console.log(updatedItems);
    dispatch(pushItemsToCart(updatedItems));
  } else {
    const updatedItems = items.filter(item => item.id !== removableItem.id);
    dispatch(pushItemsToCart(updatedItems));
  }
};
