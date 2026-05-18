import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestionAnswer } from '../data/_DATA';

export const fetchQuestions = createAsyncThunk(
  'polls/fetchQuestions', async () => {
    return await _getQuestions()
  }
)

export const saveQuestionAnswer = createAsyncThunk(
  'polls/saveQuestionAnswer', async ({ authedUser, qid, answer }) => {
    await _saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })

    return {
      authedUser,
      qid,
      answer,
    }
  }
)

const pollReducer = createSlice({
  name: 'polls',
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchQuestions.fulfilled,
      (_, action) => {
        return action.payload
      }
    )

    builder.addCase(
      saveQuestionAnswer.fulfilled,
      (state, action) => {
        const {
          authedUser,
          qid,
          answer,
        } = action.payload

        state[qid][answer].votes.push(
          authedUser
        )
      }
    )
  },
})

export default pollReducer.reducer;