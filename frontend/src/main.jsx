import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from '@/components/ui/sonner'

import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.jsx'
import { EquipmentProvider } from './context/equipment.jsx'
import { UserProvider } from './context/user.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <EquipmentProvider>
      <UserProvider>
        <BrowserRouter>
          <Toaster richColors />
          <App />
        </BrowserRouter>
      </UserProvider>
    </EquipmentProvider>
  </AuthProvider>
)
