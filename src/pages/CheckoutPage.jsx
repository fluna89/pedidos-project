import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { LogIn, User, ShoppingCart, ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const { isAuthenticated } = useAuth()
  const { items, subtotal } = useCart()
  const navigate = useNavigate()

  // No items → redirect to cart
  if (items.length === 0) {
    return (
      <div className="space-y-4 py-12 text-center">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
        <p className="text-gray-500 dark:text-gray-400">
          Tu carrito está vacío
        </p>
        <Link to="/menu">
          <Button variant="outline">Ver menú</Button>
        </Link>
      </div>
    )
  }

  // Not authenticated → show login gate
  if (!isAuthenticated) {
    return (
      <div className="flex justify-center pt-8">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle>Para continuar, ingresá</CardTitle>
            <CardDescription>
              Necesitás una cuenta o ingresar como invitado para confirmar tu
              pedido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/login" state={{ from: '/checkout' }}>
              <Button className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/register" state={{ from: '/checkout' }}>
              <Button variant="outline" className="w-full">
                Crear cuenta
              </Button>
            </Link>
            <Link to="/guest" state={{ from: '/checkout' }}>
              <Button variant="secondary" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Continuar como invitado
              </Button>
            </Link>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="ghost" size="sm" onClick={() => navigate('/cart')}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver al carrito
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Authenticated → show order summary (placeholder for v0.5+)
  return (
    <div className="flex justify-center pt-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Resumen del pedido</CardTitle>
          <CardDescription>
            {items.length} {items.length === 1 ? 'producto' : 'productos'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((item) => (
            <div
              key={item.cartId}
              className="flex justify-between text-sm"
            >
              <span>
                {item.quantity}x {item.name}{' '}
                <span className="text-gray-500 dark:text-gray-400">
                  ({item.format.name})
                </span>
              </span>
              <span className="font-medium">
                ${(item.unitPrice * item.quantity).toLocaleString('es-AR')}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
            <div className="flex justify-between font-bold">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString('es-AR')}</span>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-gray-500">
            El costo de envío se calculará en la próxima versión
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" disabled>
            Confirmar y pagar (próximamente)
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/cart')}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver al carrito
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
