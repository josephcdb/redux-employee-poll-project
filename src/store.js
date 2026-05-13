import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import usersReducer from './reducers/userReducer';
import pollsReducer from './reducers/pollReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    polls: pollsReducer,
  },
})