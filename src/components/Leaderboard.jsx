import { useSelector } from 'react-redux';

export default function Leaderboard() {
  const users = useSelector((state) => state.users);

  const leaderboard = Object.values(users)
    .map((user) => ({
      ...user,
      score:
        user.questions.length +
        Object.keys(user.answers).length,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="space-y-4">
        {leaderboard.map((user) => (
          <div key={user.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <img src={user.avatarURL} alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <p>Asked by {user.name}</p>
            <div>
              <h2 className="font-bold text-lg">{user.name}</h2>
              <p>Questions Asked: {' ' + user.questions.length}</p>
              <p>Questions Answered:{' ' + Object.keys(user.answers).length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}