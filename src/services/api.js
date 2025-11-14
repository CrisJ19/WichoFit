// api.js — API simulada local

import { gymProducts } from "../data/gymProducts.js";

let products = [...gymProducts]; // copia editable

//  Obtener TODOS los productos
export async function getProducts() {
  return Promise.resolve(products);
}

//  Obtener producto por ID
export async function getProduct(id) {
  return Promise.resolve(products.find(p => p.id === id));
}

//  Crear producto
export async function createProduct(product) {
  const newProduct = {
    ...product,
    id: Date.now(), // ID único
  };

  products.push(newProduct);

  return Promise.resolve(newProduct);
}

//  Actualizar producto
export async function updateProduct(id, updated) {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updated };
  }

  return Promise.resolve(products[index]);
}

//  Eliminar producto
export async function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  return Promise.resolve({ success: true });
}