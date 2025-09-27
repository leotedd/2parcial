import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import ProductTable from '../components/ProductTable'
import Modal from '../components/Modal'
import ProductForm from '../components/ProductForm'
import ConfirmDialog from '../components/ConfirmDialog'
import type { Product } from '../types'

export default function Home() {
  const { state, update, remove } = useProducts()
  const { items, loading, error } = state

  const [query, setQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const pageSize = 10

  const [editing, setEditing] = useState<Product | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const filtered = useMemo(
    () =>
      items.filter((p: Product) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = filtered.slice((page - 1) * pageSize, page * pageSize)

  function handleEditSubmit(data: { title: string; price: number }) {
    if (!editing) return
    update(editing.id, data)
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Productos</h1>
        <Link to="/nuevo" className="px-4 py-2 rounded-lg bg-blue-600 text-white">
          Añadir
        </Link>
      </header>

      <div className="flex items-center gap-3">
        <input
          className="w-full sm:w-80 rounded-lg border px-3 py-2"
          placeholder="Buscar por título..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value)
            setPage(1)
          }}
        />
        <span className="text-sm text-slate-500">Total: {filtered.length}</span>
      </div>

      {loading && <p className="text-slate-500">Cargando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ProductTable
        items={current}
        onEdit={(p: Product) => setEditing(p)}
        onDelete={(id: number) => setDeletingId(id)}
      />

      {/* Paginación cliente */}
      <div className="flex items-center gap-2 justify-end">
        <button
          className="px-3 py-1 rounded-md border disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span className="text-sm">
          {page} / {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded-md border disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>

      {/* Editar */}
      <Modal open={!!editing} title="Editar producto" onClose={() => setEditing(null)}>
        {editing && (
          <ProductForm
            initial={editing}
            onSubmit={(data) => handleEditSubmit(data)}
            submitText="Guardar cambios"
          />
        )}
      </Modal>

      {/* Eliminar */}
      <ConfirmDialog
        open={deletingId !== null}
        message="¿Seguro que deseas eliminar este producto?"
        onCancel={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId !== null) remove(deletingId)
          setDeletingId(null)
        }}
      />
    </div>
  )
}
