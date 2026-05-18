import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authReducer';
import { Link, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authedUser = useSelector((state) => state.auth.authedUser);
  const user = useSelector((state) => state.users[authedUser]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <header className="flex items-center p-4 border-b mb-6">
      <nav className="flex items-center w-full gap-4">
        <Link to="/" className="text-black font-bold text-xs sm:text-sm">Home</Link>
        <Link to="/leaderboard" className="text-black font-bold text-xs sm:text-sm">Leaderboard</Link>
        <Link to="/add" className="text-black font-bold text-xs sm:text-sm">New</Link>
          {user && (
            <div className="ml-auto flex items-center gap-2">
              <span>Welcome {user.name}</span>
              <img src={user.avatarURL} alt={user.name} className="w-8 h-8 rounded-full object-cover"/>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
      </nav>
    </header>
  )
}