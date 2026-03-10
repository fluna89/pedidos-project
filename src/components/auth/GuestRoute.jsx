import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function GuestRoute({ children }) {
  const { isAuthenticated, isGuest, isAdmin } = useAuth()
  const location = useLocation()
  const returnTo = location.state?.from || '/'

  // Allow guest users through so they can upgrade to a full account
  if (isAuthenticated && !isGuest) {
    return <Navigate to={isAdmin ? '/admin' : returnTo} replace />
  }

  return children
}
