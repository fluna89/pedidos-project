import { useLoyalty } from '@/hooks/useLoyalty'
import { Star } from 'lucide-react'

/**
 * Small badge to display in the header showing current points balance.
 * Only renders for eligible (registered non-guest) users with points.
 */
export default function PointsBadge() {
  const { balance, eligible, loading } = useLoyalty()

  if (!eligible || loading) return null

  return (
    <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900 dark:text-amber-200">
      <Star className="h-3 w-3" />
      {balance.toLocaleString('es-AR')}
    </div>
  )
}
