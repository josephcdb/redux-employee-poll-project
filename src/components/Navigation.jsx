import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authReducer';
import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authedUser = useSelector((state) => state.auth.authedUser)
  const user = useSelector((state) =>
    state.users[authedUser]
  )

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav>
      <Link to="/">Home</Link>

      {user && (
        <>
          <span>Logged in as: {user.name}</span>

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  )
}