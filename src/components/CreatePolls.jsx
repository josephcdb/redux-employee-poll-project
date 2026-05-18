import PropTypes from 'prop-types';

function PollCard({ poll }) {
  return (
    <div className="p-4 mb-4">
      <h3 className="text-lg font-bold mb-4">
        Would You Rather
      </h3>

      <div className="grid grid-cols-2 gap-4">

        <div className="border rounded p-4 flex flex-col">
          <p className="mb-4">
            {poll.optionOne.text}
          </p>

          <button className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Click
          </button>
        </div>

        <div className="border rounded p-4 flex flex-col">
          <p className="mb-4">
            {poll.optionTwo.text}
          </p>

          <button className="mt-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Click
          </button>
        </div>

      </div>
    </div>
  )
}

PollCard.propTypes = {
  poll: PropTypes.shape({
    optionOne: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,

    optionTwo: PropTypes.shape({
      text: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PollCard;