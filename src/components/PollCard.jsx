import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString('en-US');

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${time} | ${formattedDate}`;
}

function PollCard({ poll }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white flex flex-col gap-2">
      <p className="font-semibold text-gray-900">{poll.author}</p>
      <p className="text-xs text-gray-500">{formatTimestamp(poll.timestamp)}</p>
      <Link to={`/questions/${poll.id}`}
        className="mt-2 inline-block bg-blue-600 text-white text-sm text-center py-2 rounded-md hover:bg-blue-700 transition">
        Show
      </Link>
    </div>
  );
}

PollCard.propTypes = {
  poll: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    optionOne: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
    optionTwo: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired
}

export default PollCard;