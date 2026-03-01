import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { AddressProvider } from '@/context/AddressContext'
import AppLayout from '@/components/layout/AppLayout'
import GuestRoute from '@/components/auth/GuestRoute'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import RecoverPage from '@/pages/RecoverPage'
import GuestPage from '@/pages/GuestPage'
import AddressesPage from '@/pages/AddressesPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AddressProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
                <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
                <Route path="/recover" element={<GuestRoute><RecoverPage /></GuestRoute>} />
                <Route path="/guest" element={<GuestRoute><GuestPage /></GuestRoute>} />
                <Route path="/addresses" element={<ProtectedRoute><AddressesPage /></ProtectedRoute>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AddressProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
