import type { Producto } from '../models/inventario.models';

export const inventarioDB: Producto[] = [
  { id: 1, codigo: 'PET-001', nombre: 'Concentrado adulto 8 kg', categoria: 'Alimento', tamano: 'Mediano', precio: 120000, stock: 15 },
  { id: 2, codigo: 'PET-002', nombre: 'Concentrado cachorro 4 kg', categoria: 'Alimento', tamano: 'Pequeño', precio: 75000, stock: 10 },
  { id: 3, codigo: 'PET-003', nombre: 'Snacks dentales x10', categoria: 'Snacks', tamano: 'Todos', precio: 18000, stock: 25 },
  { id: 4, codigo: 'PET-004', nombre: 'Pelota de caucho', categoria: 'Juguetes', tamano: 'Todos', precio: 12000, stock: 30 },
  { id: 5, codigo: 'PET-005', nombre: 'Hueso mordedor', categoria: 'Juguetes', tamano: 'Grande', precio: 22000, stock: 12 },
  { id: 6, codigo: 'PET-006', nombre: 'Shampoo antipulgas', categoria: 'Higiene', tamano: 'Todos', precio: 28000, stock: 9 },
  { id: 7, codigo: 'PET-007', nombre: 'Collar ajustable', categoria: 'Accesorios', tamano: 'Pequeño', precio: 15000, stock: 20 },
  { id: 8, codigo: 'PET-008', nombre: 'Cama acolchada', categoria: 'Accesorios', tamano: 'Grande', precio: 95000, stock: 4 },
  { id: 9, codigo: 'PET-009', nombre: 'Pipeta antiparasitaria', categoria: 'Salud', tamano: 'Mediano', precio: 35000, stock: 8 },
  { id: 10, codigo: 'PET-010', nombre: 'Correa retráctil 5 m', categoria: 'Accesorios', tamano: 'Mediano', precio: 45000, stock: 6 }
];

let siguienteId = inventarioDB.length + 1;

export const obtenerSiguienteId = (): number => {
  const id = siguienteId;
  siguienteId += 1;

  return id;
};
