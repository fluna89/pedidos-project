import { useContext } from 'react'
import { AddressContext } from '@/context/address-context'

export function useAddresses() {
  const context = useContext(AddressContext)
  if (!context)
    throw new Error('useAddresses must be used within AddressProvider')
  return context
}
