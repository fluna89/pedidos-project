import { useState } from 'react'
import { useAddresses } from '@/hooks/useAddresses'
import { Button } from '@/components/ui/button'
import AddressForm from '@/components/addresses/AddressForm'
import AddressCard from '@/components/addresses/AddressCard'
import { Plus } from 'lucide-react'

export default function AddressesPage() {
  const {
    addresses,
    activeId,
    loading,
    addAddress,
    editAddress,
    removeAddress,
    selectActive,
  } = useAddresses()

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null) // address object or null
  const [saving, setSaving] = useState(false)

  async function handleAdd(data) {
    setSaving(true)
    try {
      await addAddress(data)
      setShowForm(false)
    } finally {
      setSaving(false)
    }
  }

  async function handleEdit(data) {
    setSaving(true)
    try {
      await editAddress(editing.id, data)
      setEditing(null)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('¿Eliminar esta dirección?')) return
    await removeAddress(id)
  }

  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500 dark:text-gray-400">
        Cargando direcciones...
      </div>
    )
  }

  // Show form to add or edit
  if (showForm) {
    return (
      <div className="flex justify-center pt-4">
        <AddressForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
          loading={saving}
        />
      </div>
    )
  }

  if (editing) {
    return (
      <div className="flex justify-center pt-4">
        <AddressForm
          initial={editing}
          onSubmit={handleEdit}
          onCancel={() => setEditing(null)}
          loading={saving}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Mis direcciones</h1>
        <Button size="sm" onClick={() => setShowForm(true)}>
          <Plus className="mr-1 h-4 w-4" />
          Agregar
        </Button>
      </div>

      {addresses.length === 0 ? (
        <p className="py-8 text-center text-gray-500 dark:text-gray-400">
          No tenés direcciones guardadas. ¡Agregá una!
        </p>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              isActive={addr.id === activeId}
              onSelect={selectActive}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
