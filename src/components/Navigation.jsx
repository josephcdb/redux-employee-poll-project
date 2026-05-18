import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/authReducer';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authedUser = useSelector((state) => state.auth.authedUser);
  const user = useSelector((state) => state.users[authedUser]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }

  const navLinkClass = ({ isActive }) => `text-black font-bold text-xs sm:text-sm
    ${isActive
      ? 'underline underline-offset-4'
      : ''
    }`;

  return (
    <header className="flex items-center p-4 border-b mb-6">
      <nav className="flex items-center w-full gap-4">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/leaderboard" className={navLinkClass}>Leaderboard</NavLink>
        <NavLink to="/add" className={navLinkClass}>New</NavLink>
          {user && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs sm:text-sm">Welcome {user.name}</span>
              <img src={user.avatarURL} alt={user.name} className="w-8 h-8 rounded-full object-cover"/>
              <button onClick={handleLogout} className="cursor-pointer text-xs sm:text-sm">Logout</button>
            </div>
          )}
      </nav>
    </header>
  )
}