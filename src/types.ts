// src/types.ts
export type Product = {
  id: number
  title: string
  price: number
  description?: string
  thumbnail: string   // 👈 añadida propiedad para la imagen
}

export type NewProduct = {
  title: string
  price: number
  description?: string
}
