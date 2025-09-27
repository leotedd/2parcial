// src/context/ProductsContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react'
import type { Product, NewProduct } from '../types'
import * as productApi from '../api/products'

// ========= Estado y acciones =========
type State = { items: Product[]; loading: boolean; error: string | null }
type Action =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; payload: Product[] }
  | { type: 'LOAD_ERROR'; payload: string }
  | { type: 'ADD_LOCAL'; payload: Product }
  | { type: 'UPDATE_LOCAL'; payload: { id: number; changes: Partial<Product> } }
  | { type: 'DELETE_LOCAL'; payload: number }

const initialState: State = { items: [], loading: false, error: null }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: null }
    case 'LOAD_SUCCESS':
      return { items: action.payload, loading: false, error: null }
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'ADD_LOCAL':
      return { ...state, items: [...state.items, action.payload] }
    case 'UPDATE_LOCAL':
      return {
        ...state,
        items: state.items.map((p: Product) =>
          p.id === action.payload.id ? { ...p, ...action.payload.changes } : p
        ),
      }
    case 'DELETE_LOCAL':
      return { ...state, items: state.items.filter((p: Product) => p.id !== action.payload) }
    default:
      return state
  }
}

// ========= Contexto =========
type Ctx = {
  state: State
  load: () => Promise<void>
  add: (data: NewProduct) => Promise<void>
  update: (id: number, changes: Partial<Product>) => Promise<void>
  remove: (id: number) => Promise<void>
}

const ProductsContext = createContext<Ctx | null>(null)

// Placeholder para productos creados desde el cliente
const DEFAULT_THUMB =
  'https://via.placeholder.com/64?text=IMG'

// ========= Provider =========
export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  async function load() {
    try {
      dispatch({ type: 'LOAD_START' })
      const result = await productApi.fetchProducts(50, 0)
      dispatch({
        type: 'LOAD_SUCCESS',
        payload: result.products.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          description: p.description,
          thumbnail: p.thumbnail ?? DEFAULT_THUMB, // 👈 incluimos thumbnail
        })),
      })
    } catch (e: any) {
      dispatch({ type: 'LOAD_ERROR', payload: e.message ?? 'Error' })
    }
  }

  // Crear (UI optimista)
  async function add(data: NewProduct) {
    // Como Product exige `thumbnail`, ponemos un placeholder local
    const local: Product = { id: Date.now(), thumbnail: DEFAULT_THUMB, ...data }
    dispatch({ type: 'ADD_LOCAL', payload: local })
    try { await productApi.addProduct(data) } catch { /* DummyJSON simula cambios */ }
  }

  // Actualizar (UI optimista)
  async function update(id: number, changes: Partial<Product>) {
    dispatch({ type: 'UPDATE_LOCAL', payload: { id, changes } })
    try { await productApi.updateProduct(id, changes) } catch {}
  }

  // Eliminar (UI optimista)
  async function remove(id: number) {
    dispatch({ type: 'DELETE_LOCAL', payload: id })
    try { await productApi.deleteProduct(id) } catch {}
  }

  useEffect(() => { load() }, [])

  return (
    <ProductsContext.Provider value={{ state, load, add, update, remove }}>
      {children}
    </ProductsContext.Provider>
  )
}

// ========= Hook =========
export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts debe usarse dentro de ProductsProvider')
  return ctx
}
