import jwt from 'jsonwebtoken';
import setAuthToken from '../utils/setAuthToken';

import { SET_CURRENT_USER, USER_LOADING } from './types';
import jwtStorage from '../utils/jwtStorage';

import Config from '../config/config';

// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// User loading
export const setUserLoading = ({ status }) => ({
  type: USER_LOADING,
  payload: status,
});

// Login user
export const loginUser = token => dispatch => {
  jwtStorage.setItem(token);
  setAuthToken(token);
  try {
    const decoded = jwt.verify(token, Config.jwtSecret);
    dispatch(setCurrentUser(decoded));
  } catch (e) {
    throw new Error(e.message);
  }
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  jwtStorage.removeItem();
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
