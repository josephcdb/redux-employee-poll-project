import PropTypes from 'prop-types';

export default function PollCard({ poll }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        marginBottom: '1rem',
        padding: '1rem',
      }}
    >
      <h3>Would you rather...</h3>

      <p>{poll.optionOne.text}</p>
      <p>OR</p>
      <p>{poll.optionTwo.text}</p>
    </div>
  )
}