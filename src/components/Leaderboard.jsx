import { useSelector } from 'react-redux';

export default function Leaderboard() {
  const users = useSelector((state) => state.users);

  const leaderboard = Object.values(users).map((user) => ({
    ...user,
    answered: Object.keys(user.answers).length,
    created: user.questions.length,
  })).sort((a, b) => (b.answered + b.created) - (a.answered + a.created));

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Table Header */}
      <div className="grid grid-cols-3 font-semibold text-gray-600 border-b pb-2 mb-3">
        <div>Users</div>
        <div className="text-center">Answered</div>
        <div className="text-center">Created</div>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {leaderboard.map((user) => (
          <div key={user.id}
            className="grid grid-cols-3 items-center border rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition"
          >
            {/* Logo with two lines of name and id */}
            <div className="flex items-center gap-3">
              <img
                src={user.avatarURL}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              {/* Text block with two lines */}
              <div className="flex flex-col leading-tight">
                <span className="font-medium text-gray-900">
                  {user.name}
                </span>

                <span className="text-left text-xs text-gray-500">
                  {user.id}
                </span>
              </div>
            </div>

            {/* Answered */}
            <div className="text-center font-semibold text-blue-600">
              {Object.keys(user.answers).length}
            </div>

            {/* Created */}
            <div className="text-center font-semibold text-green-600">
              {user.questions.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}