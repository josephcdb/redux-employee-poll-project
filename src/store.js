import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import pollReducer from './reducers/pollReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    polls: pollReducer,
  },
});

export default store;