import { useState, useEffect } from 'react'
import { getMenu } from '@/mocks/handlers'
import ProductCard from '@/components/catalog/ProductCard'

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getMenu().then((data) => {
      if (!cancelled) {
        setProducts(data)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        Cargando menú...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Menú</h1>

      {products.length === 0 ? (
        <p className="py-8 text-center text-gray-500 dark:text-gray-400">
          No hay productos disponibles
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
