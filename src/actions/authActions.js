import jwt from 'jsonwebtoken';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import { SET_CURRENT_USER, USER_LOADING } from './types';
import jwtStorage from '../utils/jwtStorage';

import Config from '../config/config';

const AUTH_URL = '/api/auth';

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
  // Set auth token to headers for requests
  setAuthToken(token);
  try {
    const user = jwt.verify(token, Config.jwtSecret);
    axios
      .get(AUTH_URL)
      .then(res => {
        const {
          email, name, surname, middleName, address, phone,
        } = res.data;
        dispatch(setCurrentUser({
          ...user, email, name, surname, middleName, address, phone,
        }));
      })
      .catch(() => {});
  } catch (e) {
    // eslint-disable-next-line no-use-before-define
    dispatch(logoutUser());
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
