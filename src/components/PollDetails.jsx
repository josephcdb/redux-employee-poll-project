import { useParams, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveQuestionAnswer } from '../reducers/pollReducer';
import PropTypes from 'prop-types';

function ResultBar({ text, votes, totalVotes, selected }) {
  const percentage = Math.round((votes.length / totalVotes) * 100);

  return (
    <div className={`border rounded-lg p-4
        ${ selected
            ? 'border-green-500 bg-green-50'
            : ''
        }`}>
      <p className="font-semibold mb-2">{text}</p>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${percentage}%` }} />
      </div>

      <p>{votes.length} votes ({percentage}%)</p>

      {selected && (
        <p className="mt-2 font-bold text-green-700">Your choice</p>
      )}
    </div>
  )
}

ResultBar.propTypes = {
  text: PropTypes.string.isRequired,
  votes: PropTypes.array.isRequired,
  totalVotes: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired
}

export default function PollDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const poll = useSelector((state) => state.polls[id]);
  const authedUser = useSelector((state) => state.auth.authedUser);
  const users = useSelector((state) => state.users);

  if (!poll) {
    return <Navigate to="/404" replace />
  }

  const author = users[poll.author];
  const userAnswer = users?.[authedUser]?.answers?.[id];
  const answered = !!userAnswer;
  const totalVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length;

  const handleVote = (answer) => {
    if (answered) return;

    dispatch(
      saveQuestionAnswer({ authedUser, qid: id, answer })
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="border rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-2">Would You Rather</h1>
        <p className="mb-6 text-gray-500">Asked by {author.name}</p>

        {answered ? (
            <div className="space-y-4">

            <ResultBar text={ poll.optionOne.text }
              votes={ poll.optionOne.votes }
              totalVotes={totalVotes}
              selected={ userAnswer === 'optionOne' }
            />

            <ResultBar
              text={ poll.optionTwo.text }
              votes={ poll.optionTwo.votes }
              totalVotes={totalVotes}
              selected={ userAnswer === 'optionTwo' }
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <p className="mb-6">{poll.optionOne.text}</p>

              <button onClick={() => handleVote('optionOne')}
                className="w-full bg-blue-600 text-white py-2 rounded">
                Vote
              </button>
            </div>

            <div className="border rounded-lg p-4">
              <p className="mb-6">{poll.optionTwo.text}</p>

              <button onClick={() => handleVote('optionTwo')}
                className="w-full bg-green-600 text-white py-2 rounded">
                Vote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}