import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchUsers } from './reducers/userReducer'
import { fetchQuestions } from './reducers/pollReducer'

import { Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Navigation from './components/Navigation'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchQuestions())
  }, [dispatch])

  return (
    <>
      <Navigation />
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
      </Routes>
    </>
  )
}