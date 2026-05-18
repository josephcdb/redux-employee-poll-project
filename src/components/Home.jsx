import { useSelector } from 'react-redux';
import { useState } from 'react';
import PollCard from './CreatePolls';

export default function Home() {
  const [showAnswered, setShowAnswered] = useState(false)

  const authedUser = useSelector(
    (state) => state.auth.authedUser
  )

  const polls = useSelector((state) => state.polls || {})
  const users = useSelector((state) => state.users || {})

  if (
  !authedUser ||
  !users[authedUser] ||
  Object.keys(polls).length === 0
  ) {
    return <p>Loading...</p>
  }

  const answeredIds = Object.keys(
    users[authedUser].answers
  )

  const allPolls = Object.values(polls).sort(
    (a, b) => b.timestamp - a.timestamp
  )

  const filteredPolls = allPolls.filter((poll) => {
    const answered = answeredIds.includes(poll.id)

    return showAnswered ? answered : !answered
  })

  return (
    <div>
      <h1>Polls Dashboard Page</h1>

      <div>
        <button onClick={() => setShowAnswered(false)}>
          Unanswered
        </button>

        <button onClick={() => setShowAnswered(true)}>
          Answered
        </button>
      </div>

      {filteredPolls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  )
}