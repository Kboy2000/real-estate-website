import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireRole?: 'user' | 'agent'
}

const ProtectedRoute = ({ children, requireRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-luxury-black/70">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Role-based access control
  if (requireRole && user?.role !== requireRole) {
    // Redirect agents trying to access client pages to agent dashboard
    if (user?.role === 'agent' && requireRole === 'user') {
      return <Navigate to="/agent/dashboard" replace />
    }
    // Redirect users trying to access agent pages to user dashboard
    if (user?.role === 'user' && requireRole === 'agent') {
      return <Navigate to="/dashboard" replace />
    }
  }

  return <>{children}</>
}

export default ProtectedRoute
