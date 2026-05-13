import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { _getUsers } from '../data/_DATA'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await _getUsers()
    return users
  }
)

const userReducer = createSlice({
  name: 'users',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default userReducer.reducer;