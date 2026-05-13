import { createSlice } from '@reduxjs/toolkit'

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    authedUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.authedUser = action.payload
    },

    logout: (state) => {
      state.authedUser = null
    },
  },
})

export const { login, logout } = authReducer.actions;
export default authReducer.reducer;