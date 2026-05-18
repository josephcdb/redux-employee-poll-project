import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../data/_DATA';
import { saveQuestionAnswer, addQuestion } from './pollReducer';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', async () => {
    return await _getUsers()
  }
)

const userReducer = createSlice({
  name: 'users',
  initialState: {},
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
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

        state[authedUser].answers[qid] =
          answer
      }
    )

    builder.addCase(
      addQuestion.fulfilled,
      (state, action) => {
        const question = action.payload

        state[question.author].questions.push(
          question.id
        )
      }
    )
  },
})

export default userReducer.reducer;