import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

export default function GuestPage() {
  const { loginAsGuest } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const returnTo = location.state?.from || '/'
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await loginAsGuest({ name, phone, email })
      navigate(returnTo)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-start justify-center pt-12 sm:items-center sm:pt-0">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Continuar como invitado</CardTitle>
          <CardDescription>
            Completá los datos mínimos para hacer tu pedido
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <p className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                {error}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="11-2345-6789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-gray-400 dark:text-gray-500">(opcional)</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Continuando...' : 'Continuar'}
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              ¿Querés una cuenta?{' '}
              <Link to="/register" className="font-medium hover:text-gray-900 dark:hover:text-gray-100">
                Registrate
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
