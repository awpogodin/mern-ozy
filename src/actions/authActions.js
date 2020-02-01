import setAuthToken from '../utils/setAuthToken';

import { SET_CURRENT_USER, USER_LOADING } from './types';

// Register User
// export const registerUser = (userData, history) => dispatch => {
//   axios
//     .post('/api/auth/register', userData)
//     .then(() => history.push('/login'))
//     .catch(err => dispatch({
//       type: GET_ERRORS,
//       payload: err.response.data,
//     }));
// };

// Set logged in user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

// User loading
export const setUserLoading = () => ({
  type: USER_LOADING,
});

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
