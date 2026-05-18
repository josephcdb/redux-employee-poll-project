import { useSelector, useDispatch } from 'react-redux';
import { login } from '../reducers/authReducer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const [selectedUser, setSelectedUser] = useState('')

  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedUser) return

    dispatch(login(selectedUser))
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white border rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Employee Poll Login Page</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border rounded-md p-2 m-2"
        >
          <option value="">Please select user</option>

          {Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Login
        </button>
      </form>
      </div>
    </div>
  )
}