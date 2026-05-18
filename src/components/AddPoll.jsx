import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addQuestion } from '../reducers/pollReducer';

export default function AddPoll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authedUser = useSelector( (state) => state.auth.authedUser);
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !optionOne.trim() ||
      !optionTwo.trim()
    ) {
      return
    }

    await dispatch(
      addQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser,
      })
    )

    navigate('/');
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">
        Would You Rather
      </h1>

      <p className="mb-6 text-gray-500">
        Create your own poll
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="First option"
          value={optionOne}
          onChange={(e) =>
            setOptionOne(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        />

        <div className="text-center font-bold">
          OR
        </div>

        <input
          type="text"
          placeholder="Second option"
          value={optionTwo}
          onChange={(e) =>
            setOptionTwo(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          disabled={
            !optionOne || !optionTwo
          }
          className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-400"
        >
          Submit Poll
        </button>
      </form>
    </div>
  )
}