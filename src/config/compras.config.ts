import type { Compra } from '../models/compras.models';

export const comprasDB: Compra[] = [
  {
    id: 1,
    cliente_id: 1,
    producto_id: 1,
    cantidad: 2,
    total: 240000,
    fecha: new Date('2026-10-06T15:00:00.000Z')
  },
  {
    id: 2,
    cliente_id: 2,
    producto_id: 4,
    cantidad: 3,
    total: 36000,
    fecha: new Date('2026-10-06T16:30:00.000Z')
  }
];

let siguienteId = comprasDB.length + 1;

export const obtenerSiguienteId = (): number => {
  const id = siguienteId;
  siguienteId += 1;

  return id;
};
