import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { _getQuestions } from '../data/_DATA'

export const fetchQuestions = createAsyncThunk(
  'polls/fetchQuestions',
  async () => {
    const questions = await _getQuestions()
    return questions
  }
)

const pollReducer = createSlice({
  name: 'polls',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default pollReducer.reducer;