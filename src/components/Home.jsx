import { useState } from 'react';
import { useSelector } from 'react-redux';
import PollCard from './PollCard';

export default function Home() {
  const [showAnswered, setShowAnswered] = useState(false);
  const authedUser = useSelector((state) => state.auth.authedUser);
  const polls = useSelector((state) => state.polls || {});
  const users = useSelector((state) => state.users || {});

  if (!authedUser || !users[authedUser] || Object.keys(polls).length === 0) {
    return <p>Loading...</p>;
  }

  const answeredIds = Object.keys(users[authedUser].answers);

  const allPolls = Object.values(polls).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  // Unanswered
  const unansweredPolls = allPolls.filter(
    (poll) => !answeredIds.includes(poll.id)
  );

  // Answered
  const answeredPolls = allPolls.filter(
    (poll) => answeredIds.includes(poll.id)
  );

  const displayedPolls = showAnswered
    ? answeredPolls
    : unansweredPolls;

  return (
    <div className="max-w-5xl mx-auto px-4">

      {/* Toggle */}
      <div className="flex mb-6 border rounded-lg overflow-hidden">
        <button
          onClick={() => setShowAnswered(false)}
          className={`flex-1 py-3 font-semibold transition ${
            showAnswered
              ? 'bg-white text-gray-700'
              : 'bg-blue-600 text-white'
          }`}>
          Unanswered Questions
        </button>

        <button
          onClick={() => setShowAnswered(true)}
          className={`flex-1 py-3 font-semibold transition ${
            showAnswered
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700'
          }`}>
          Answered Questions
        </button>
      </div>

      {/* Single List Only */}
      <section className="border rounded-xl p-5 bg-white">
        <h1 className="text-xl font-bold border-b pb-3 mb-4">
          {showAnswered ? 'Answered Questions' : 'New Questions'}
        </h1>

        {displayedPolls.length === 0 ? (
          <p className="text-gray-500">No polls available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayedPolls.map((poll) => (
              <PollCard
                key={poll.id}
                poll={poll}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}