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
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>

          {Object.values(users).map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}