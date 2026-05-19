import PropTypes from 'prop-types';

export default function ResultBar({ text, votes, totalVotes, selected }) {
  const percentage = Math.round((votes.length / totalVotes) * 100);

  return (
    <div className={`border rounded-lg p-4
      ${selected ? 'border-green-500 bg-green-50' : ''}`}>

      <p className="font-semibold mb-2">{text}</p>

      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${percentage}%` }}/>
      </div>

      <p>{votes.length} {(votes.length === 1) ? 'vote' : 'votes'} ({percentage}%)</p>

      {selected && (
        <p className="mt-2 font-bold text-green-700">Your choice</p>
      )}
    </div>
  );
}

ResultBar.propTypes = {
  text: PropTypes.string.isRequired,
  votes: PropTypes.array.isRequired,
  totalVotes: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
};