import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { UtensilsCrossed } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        Bienvenido a Pedidos
      </h1>
      <p className="max-w-md text-gray-500 dark:text-gray-400">
        Hacé tu pedido para delivery o retiro en local. Explorá nuestro menú y
        armá tu pedido fácilmente.
      </p>
      <Link to="/menu">
        <Button size="lg">
          <UtensilsCrossed className="mr-2 h-5 w-5" />
          Ver menú
        </Button>
      </Link>
    </div>
  )
}
