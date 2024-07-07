import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuth } from '@/hooks/useAuth.js'

import Login from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Usuarios } from './pages/Usuarios'

import Block from './pages/Block'

function App () {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route index element={<Navigate to='/login' />} />
      <Route path='/' element={<Navigate to='/login' />} />
      <Route path='*' element={<Navigate to='/login' />} />

      <Route path='/block' element={<Block />} />

      <Route path='/login' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} />
      <Route path='/Dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/Usuarios' element={<ProtectedRoute><Usuarios /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
