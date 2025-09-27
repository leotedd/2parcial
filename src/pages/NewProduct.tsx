import React from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import { useProducts } from '../context/ProductsContext'
import type { NewProduct } from '../types'

export default function NewProduct() {
  const { add } = useProducts()
  const navigate = useNavigate()

  async function handleSubmit(data: NewProduct) {
    await add(data)       // UI optimista
    navigate('/')         // volver a la lista
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Nuevo producto</h1>
      <ProductForm onSubmit={handleSubmit} submitText="Crear" />
    </div>
  )
}
