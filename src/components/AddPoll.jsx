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
    e.preventDefault();

    if (!optionOne.trim() || !optionTwo.trim()) {
      return;
    }

    dispatch(addQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    }));
    navigate('/');
  }

  return (
    <div className="max-w-xl mx-auto px-4">
      <h2 className="text-xl font-bold mb-2">Would You Rather Create Your Own Poll?</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="font-bold" htmlFor="optionOne">First Option</label>
        <input type="text"
          id="optionOne"
          name="optionOne"
          placeholder="Option One"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <label className="font-bold" htmlFor="optionTwo">Second Option</label>
        <input id="optionTwo" name="optionTwo" type="text"
          placeholder="Option Two"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button type="submit"
          disabled={!optionOne || !optionTwo}
          className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-400">
          Submit Poll
        </button>
      </form>
    </div>
  )
}