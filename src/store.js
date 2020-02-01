/* eslint-disable no-underscore-dangle */
import {
  createStore, applyMiddleware, compose,
} from 'redux';
import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default (persistingEnabled) => {
  const store = createStore(
    persistingEnabled ? persistedReducer : rootReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );
  if (!persistingEnabled) {
    return { store };
  }
  const persistor = persistStore(store);
  return { store, persistor };
};
