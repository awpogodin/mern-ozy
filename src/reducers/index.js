import { combineReducers } from 'redux';
import authReducer from './authReducer';
import shoppingCartReducer from './shoppingCartReducer';

export default combineReducers({
  auth: authReducer,
  shoppingCart: shoppingCartReducer,
});
