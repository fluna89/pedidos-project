import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/button'
import { LogOut, MapPin, Moon, Sun, User } from 'lucide-react'

export default function Header() {
  const { user, isAuthenticated, isGuest, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-bold text-gray-900 dark:text-gray-100">
          🍔 Pedidos
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated && !isGuest && (
            <Link to="/addresses">
              <Button variant="ghost" size="sm">
                <MapPin className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Direcciones</span>
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-gray-600 dark:text-gray-400 sm:inline">
                {user.isGuest ? 'Invitado' : user.name}
              </span>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <User className="mr-1 h-4 w-4" />
                Ingresar
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
