import { goalsReducer } from './reducers/goalsReducer.js';
import { loginReducer } from './reducers/loginReducer.js';
import { userReducer } from './reducers/userReducer.js';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  goals: goalsReducer,
  login: loginReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['goals'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     goals: goalsReducer,
//     login: loginReducer,
//     user: userReducer,
//   },
// });
