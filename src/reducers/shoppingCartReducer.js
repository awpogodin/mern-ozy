/* eslint-disable no-case-declarations */
import { ADD_TO_CART, SET_SHOPPING_CART } from '../actions/types';

const initialState = {
  _id: '',
  customerId: '',
  items: [],
  completed: false,
  address: '',
  addressType: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SHOPPING_CART:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload,
        ],
      };
    default:
      return state;
  }
}
