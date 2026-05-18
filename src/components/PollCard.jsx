import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function PollCard({ poll }) {
  return (
    <div className="border rounded-xl p-6 shadow-sm bg-white">
      <h3 className="text-xl font-bold mb-6">Would You Rather</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 flex flex-col">
          <p className="mb-6">{poll.optionOne.text}</p>
          <Link
            to={`/questions/${poll.id}`}
            className="mt-auto bg-blue-500 text-white text-center px-4 py-2 rounded hover:bg-blue-600">
            Vote
          </Link>
        </div>

        <div className="border rounded-lg p-4 flex flex-col">
          <p className="mb-6">{poll.optionTwo.text}</p>
          <Link
            to={`/questions/${poll.id}`}
            className="mt-auto bg-green-500 text-white text-center px-4 py-2 rounded hover:bg-green-600">
            Vote
          </Link>
        </div>
      </div>
    </div>
  )
}

PollCard.propTypes = {
  poll: PropTypes.shape({
    id: PropTypes.string.isRequired,
    optionOne: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    optionTwo: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired
}

export default PollCard;