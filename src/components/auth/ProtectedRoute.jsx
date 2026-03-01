import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isGuest } = useAuth()

  if (!isAuthenticated || isGuest) {
    return <Navigate to="/login" replace />
  }

  return children
}
