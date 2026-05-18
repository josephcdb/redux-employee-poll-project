import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children }) {
  const authedUser = useSelector((state) => state.auth.authedUser);
  const location = useLocation();

  if (!authedUser) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};