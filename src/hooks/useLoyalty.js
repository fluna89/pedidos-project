import { useContext } from 'react'
import { LoyaltyContext } from '@/context/loyalty-context'

export function useLoyalty() {
  const ctx = useContext(LoyaltyContext)
  if (!ctx) throw new Error('useLoyalty must be used within LoyaltyProvider')
  return ctx
}
