import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import NewProduct from './pages/NewProduct'
import { ProductsProvider } from './context/ProductsContext'

export default function App() {
  return (
    <ProductsProvider>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-semibold">Laboratorio · Productos</Link>
            <a className="text-sm text-blue-600 underline" href="https://dummyjson.com" target="_blank" rel="noreferrer">
              API: dummyjson.com
            </a>
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nuevo" element={<NewProduct />} />
          </Routes>
        </main>
      </div>
    </ProductsProvider>
  )
}
