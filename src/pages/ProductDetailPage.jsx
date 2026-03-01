import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMenuItem } from '@/mocks/handlers'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedFormat, setSelectedFormat] = useState(null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [comment, setComment] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await getMenuItem(Number(id))
        if (!cancelled) {
          setProduct(data)
          if (data.formats.length === 1) {
            setSelectedFormat(data.formats[0])
          }
        }
      } catch {
        if (!cancelled) navigate('/menu', { replace: true })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [id, navigate])

  function toggleExtra(extra) {
    setSelectedExtras((prev) =>
      prev.some((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra],
    )
  }

  function handleAddToCart() {
    if (!selectedFormat) return
    addItem(product, selectedFormat, selectedExtras, comment)
    setAdded(true)
    setTimeout(() => navigate('/menu'), 800)
  }

  const totalPrice = selectedFormat
    ? selectedFormat.price +
      selectedExtras.reduce((sum, e) => sum + e.price, 0)
    : 0

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        Cargando...
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="flex justify-center pt-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 w-fit"
            onClick={() => navigate('/menu')}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver al menú
          </Button>
          <div className="flex h-40 items-center justify-center rounded-md bg-gray-100 text-5xl dark:bg-gray-800">
            {product.image ?? '🍽️'}
          </div>
          <CardTitle className="mt-3">{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Format selection */}
          <div className="space-y-2">
            <Label>Formato</Label>
            <div className="grid gap-2">
              {product.formats.map((fmt) => (
                <button
                  key={fmt.id}
                  type="button"
                  className={cn(
                    'flex items-center justify-between rounded-md border px-4 py-3 text-sm transition-colors',
                    selectedFormat?.id === fmt.id
                      ? 'border-gray-900 bg-gray-900 text-white dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900'
                      : 'border-gray-200 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500',
                  )}
                  onClick={() => setSelectedFormat(fmt)}
                >
                  <span>{fmt.name}</span>
                  <span className="font-medium">
                    ${fmt.price.toLocaleString('es-AR')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Extras */}
          {product.extras.length > 0 && (
            <div className="space-y-2">
              <Label>
                Adicionales{' '}
                <span className="text-gray-400 dark:text-gray-500">
                  (opcional)
                </span>
              </Label>
              <div className="grid gap-2">
                {product.extras.map((extra) => {
                  const selected = selectedExtras.some(
                    (e) => e.id === extra.id,
                  )
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      className={cn(
                        'flex items-center justify-between rounded-md border px-4 py-3 text-sm transition-colors',
                        selected
                          ? 'border-gray-900 bg-gray-50 dark:border-gray-100 dark:bg-gray-800'
                          : 'border-gray-200 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-500',
                      )}
                      onClick={() => toggleExtra(extra)}
                    >
                      <span className="flex items-center gap-2">
                        {selected && (
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        )}
                        {extra.name}
                      </span>
                      <span className="font-medium">
                        +${extra.price.toLocaleString('es-AR')}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="item-comment">
              Comentario{' '}
              <span className="text-gray-400 dark:text-gray-500">
                (opcional)
              </span>
            </Label>
            <Textarea
              id="item-comment"
              placeholder="Ej: sin cebolla, bien cocida..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            disabled={!selectedFormat || added}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                ¡Agregado!
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-4 w-4" />
                Agregar{' '}
                {selectedFormat
                  ? `— $${totalPrice.toLocaleString('es-AR')}`
                  : ''}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
