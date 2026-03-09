import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ProductCard({ product }) {
  const price = product.formats[0]?.price ?? 0

  return (
    <Card className="flex flex-col overflow-hidden">
      {/* placeholder image area */}
      <div className="flex h-32 items-center justify-center bg-gray-100 text-4xl dark:bg-gray-800">
        {product.image ?? '🍽️'}
      </div>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="flex-1 text-sm text-gray-500 dark:text-gray-400">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {product.unitPricing
              ? 'Armá tu pedido'
              : `$${price.toLocaleString('es-AR')}`}
          </span>
          <Link to={`/menu/${product.id}`}>
            <Button size="sm">Elegir</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
