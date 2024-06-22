import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth.js'

import Login from './pages/Login'
import { Dashboard } from './pages/Dashboard'

function App () {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route index element={<Navigate to='/login' />} />
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='*' element={<Navigate to='/login' />} />

      <Route path='/login' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} />
      <Route path='/Dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
