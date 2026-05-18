import { useSelector } from 'react-redux';
import { useState } from 'react';
import PollCard from './PollCard';

export default function Home() {
  const [showAnswered, setShowAnswered] = useState(false);
  const authedUser = useSelector((state) => state.auth.authedUser);

  const polls = useSelector((state) => state.polls || {});
  const users = useSelector((state) => state.users || {});

  if (!authedUser || !users[authedUser] || (Object.keys(polls).length === 0)) {
    return <p>Loading...</p>
  }

  const answeredIds = Object.keys(users[authedUser].answers);
  const allPolls = Object.values(polls).sort((a, b) => b.timestamp - a.timestamp);

  const filteredPolls = allPolls.filter((poll) => {
    const answered = answeredIds.includes(poll.id);
    return showAnswered ? answered : !answered;
  });

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Polls Dashboard</h1>
      <div className="flex gap-4 mb-8">
        <button onClick={() => setShowAnswered(false)}
          className={`px-4 py-2 rounded
            ${showAnswered ? 'bg-gray-200' : 'bg-blue-600 text-white'}`}>
          Unanswered
        </button>

        <button onClick={() => setShowAnswered(true)}
          className={`px-4 py-2 rounded
            ${showAnswered ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
          Answered
        </button>
      </div>

      <div className="space-y-4">
        {filteredPolls.map((poll) => (
          <PollCard key={poll.id} poll={poll}/>
        ))}
      </div>
    </div>
  )
}