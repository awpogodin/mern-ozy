/* eslint-disable no-case-declarations */
import {PUSH_ITEMS_TO_CART, SET_CURRENT_ADDRESS, SET_SHOPPING_CART} from '../actions/types';

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
    case PUSH_ITEMS_TO_CART:
      return {
        ...state,
        items: action.payload,
      };
    case SET_CURRENT_ADDRESS:
      console.log(action.payload);
      return {
        ...state,
        address: action.payload.address,
        addressType: action.payload.addressType,
      };
    default:
      return state;
  }
}
