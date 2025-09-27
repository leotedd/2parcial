import React from 'react'
import type { Product } from '../types'

type Props = {
  items: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export default function ProductTable({ items, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded-xl overflow-hidden">
        <thead className="bg-slate-100">
          <tr>
            <th className="text-left px-3 py-2">Imagen</th>
            <th className="text-left px-3 py-2">ID</th>
            <th className="text-left px-3 py-2">Título</th>
            <th className="text-left px-3 py-2">Precio</th>
            <th className="px-3 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-3 py-2">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="w-16 h-16 object-cover rounded-md border"
                />
              </td>
              <td className="px-3 py-2">{p.id}</td>
              <td className="px-3 py-2">{p.title}</td>
              <td className="px-3 py-2">${p.price}</td>
              <td className="px-3 py-2">
                <div className="flex justify-end gap-2">
                  <button
                    className="px-3 py-1 rounded-md border hover:bg-yellow-500 hover:text-white transition"
                    onClick={() => onEdit(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                    onClick={() => onDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-3 py-6 text-center text-slate-500"
              >
                Sin resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
