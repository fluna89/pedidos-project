import { useLoyalty } from '@/hooks/useLoyalty'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Loader2, Star, TrendingUp, TrendingDown, Clock } from 'lucide-react'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function PointsSection() {
  const { balance, history, loading, eligible } = useLoyalty()

  if (!eligible) {
    return (
      <div className="rounded-md bg-gray-50 px-4 py-6 text-center dark:bg-gray-800">
        <Star className="mx-auto mb-2 h-8 w-8 text-gray-300 dark:text-gray-600" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Solo los usuarios registrados acumulan puntos
        </p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-6 text-sm text-gray-400 dark:text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Cargando puntos...
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Balance card */}
      <Card>
        <CardContent className="py-6 text-center">
          <Star className="mx-auto mb-1 h-8 w-8 text-amber-500" />
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
            {balance.toLocaleString('es-AR')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            puntos disponibles
          </p>
        </CardContent>
      </Card>

      {/* History */}
      {history.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Historial de puntos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {history.map((entry) => {
              const isEarn = entry.type === 'earn'
              const isRedeem = entry.type === 'redeem'
              return (
                <div
                  key={entry.id}
                  className="flex items-start justify-between gap-2 border-b border-gray-100 pb-2 last:border-0 dark:border-gray-800"
                >
                  <div className="flex items-start gap-2">
                    {isEarn && (
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    )}
                    {isRedeem && (
                      <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    )}
                    {entry.type === 'expire' && (
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm">{entry.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(entry.date)}
                        {isEarn &&
                          entry.expiresAt &&
                          ` · Vence ${formatDate(entry.expiresAt)}`}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-sm font-semibold ${
                      isEarn
                        ? 'text-green-600 dark:text-green-400'
                        : isRedeem
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-gray-400'
                    }`}
                  >
                    {entry.points > 0 ? '+' : ''}
                    {entry.points.toLocaleString('es-AR')}
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
