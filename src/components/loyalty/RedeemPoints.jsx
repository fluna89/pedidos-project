import { useState } from 'react'
import { useLoyalty } from '@/hooks/useLoyalty'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star } from 'lucide-react'

/**
 * Lets a registered user redeem points as discount in checkout.
 * Props:
 *  - subtotal: number — current order subtotal
 *  - pointsToRedeem: number — currently set points to redeem
 *  - onChangePoints(number) — called when user changes redeem amount
 *  - maxRedeemable: number — max points that can be applied (min of balance and subtotal)
 */
export default function RedeemPoints({
  subtotal,
  pointsToRedeem,
  onChangePoints,
  maxRedeemable,
}) {
  const { balance, eligible } = useLoyalty()
  const [isOpen, setIsOpen] = useState(pointsToRedeem > 0)

  if (!eligible || balance <= 0) return null

  // Don't allow redeeming more points than the subtotal
  const cap = Math.min(balance, Math.floor(subtotal))

  function handleChange(value) {
    const num = Math.max(0, Math.min(cap, Number(value) || 0))
    onChangePoints(num)
  }

  if (!isOpen && pointsToRedeem === 0) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
      >
        <Star className="h-4 w-4" />
        Canjear puntos ({balance.toLocaleString('es-AR')} disponibles)
      </button>
    )
  }

  return (
    <div className="space-y-2 rounded-md bg-amber-50 px-3 py-3 dark:bg-amber-950">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-medium text-amber-700 dark:text-amber-300">
          <Star className="h-4 w-4" />
          Canjear puntos
        </span>
        <span className="text-xs text-amber-600 dark:text-amber-400">
          Disponibles: {balance.toLocaleString('es-AR')}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={0}
          max={cap}
          value={pointsToRedeem || ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Puntos a canjear"
          className="flex-1"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleChange(cap)}
          className="whitespace-nowrap text-xs"
        >
          Usar máximo
        </Button>
      </div>

      {pointsToRedeem > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-amber-700 dark:text-amber-300">
            Descuento: -${pointsToRedeem.toLocaleString('es-AR')}
          </span>
          <button
            type="button"
            onClick={() => {
              onChangePoints(0)
              setIsOpen(false)
            }}
            className="text-xs text-amber-500 hover:text-amber-600 dark:hover:text-amber-300"
          >
            Cancelar
          </button>
        </div>
      )}

      <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
        1 punto = $1 de descuento (máx. ${cap.toLocaleString('es-AR')})
      </p>
    </div>
  )
}
