import React, { useState } from 'react'
import type { NewProduct, Product } from '../types'

type Props = {
  initial?: Partial<Product>
  onSubmit: (data: NewProduct) => void
  submitText?: string
}

export default function ProductForm({ initial = {}, onSubmit, submitText = 'Guardar' }: Props) {
  const [title, setTitle] = useState(initial.title ?? '')
  const [price, setPrice] = useState<number>(initial.price ?? 0)
  const [errors, setErrors] = useState<{ title?: string; price?: string }>({})

  function validate() {
    const e: typeof errors = {}
    if (!title.trim()) e.title = 'El título es requerido'
    if (isNaN(price) || Number(price) <= 0) e.price = 'El precio debe ser > 0'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    onSubmit({ title: title.trim(), price: Number(price) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          className="w-full rounded-lg border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre del producto"
        />
        {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Precio</label>
        <input
          type="number"
          className="w-full rounded-lg border px-3 py-2"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
          step="0.01"
          placeholder="0.00"
        />
        {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price}</p>}
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">{submitText}</button>
      </div>
    </form>
  )
}
