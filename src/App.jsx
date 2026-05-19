import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUsers } from './reducers/userReducer';
import { fetchQuestions } from './reducers/pollReducer';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Navigation from './components/Navigation';
import AddPoll from './components/AddPoll';
import Leaderboard from './components/Leaderboard';
import PollDetails from './components/PollDetails';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchQuestions())
  }, [dispatch])

  return (
    <>
      {location.pathname !== '/login' && (
        <Navigation />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute>
              <PollDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/404"
          element={<NotFound />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddPoll />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}