import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';

import createStore from './store';
import Spinner from './components/Spinner';

const persistingEnabled = false;
const { store, persistor } = createStore(persistingEnabled);


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
