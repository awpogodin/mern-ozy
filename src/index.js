import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import App from './App';
import * as serviceWorker from './serviceWorker';

import createStore from './store';
import Spinner from './components/Spinner';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';

const persistingEnabled = false;
const { store, persistor } = createStore(persistingEnabled);

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwtDecode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser({}));

    // Redirect to login
    window.location.href = './login';
  }
}

ReactDOM.render(
  <Provider store={store}>
    {persistingEnabled ? (
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <App />
      </PersistGate>
    ) : (
      <App />
    )}

  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
