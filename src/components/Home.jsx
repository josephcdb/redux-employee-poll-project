import { useSelector } from 'react-redux';
import PollCard from './PollCard';

export default function Home() {
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

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-10">
      {/* New Questions */}
      <section className="border rounded-xl p-5 mb-8 bg-white">
        <h1 className="text-xl font-bold border-b pb-3 mb-4">New Questions</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {unansweredPolls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      </section>

      {/* Done */}
      <section className="border rounded-xl p-5 bg-white">
        <h1 className="text-xl font-bold border-b pb-3 mb-4">Answered (Done)</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {answeredPolls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      </section>
    </div>
  );
}