import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const returnTo = location.state?.from || '/'

  if (isAuthenticated) {
    return <Navigate to={returnTo} replace />
  }

  return children
}
