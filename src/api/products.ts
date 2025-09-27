// src/api/products.ts
import type { NewProduct, Product } from '../types'

const BASE = 'https://dummyjson.com'

type ApiList = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export async function fetchProducts(limit = 50, skip = 0): Promise<ApiList> {
  const res = await fetch(`${BASE}/products?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error('Error cargando productos')
  return res.json()
}

export async function addProduct(data: NewProduct): Promise<Product> {
  const res = await fetch(`${BASE}/products/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear producto')
  return res.json()
}

export async function updateProduct(id: number, changes: Partial<Product>): Promise<Product> {
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  })
  if (!res.ok) throw new Error('Error al actualizar producto')
  return res.json()
}

export async function deleteProduct(id: number): Promise<{ id: number }> {
  const res = await fetch(`${BASE}/products/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar producto')
  return res.json()
}
