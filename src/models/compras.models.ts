import { pool } from '../config/db.config';
import { ClienteModel } from './clientes.models';
import { ProductoModel } from './inventario.models';

export interface Compra {
  id?: number;
  cliente_id: number;
  cliente?: string;
  producto_id: number;
  producto?: string;
  cantidad: number;
  total?: number;
  fecha?: Date | string;
}

// En la base de datos las compras se guardan en la tabla "ventas".
// Se une con clientes e inventario para traer también los NOMBRES.
const CONSULTA_COMPRAS = `
  SELECT v.id,
         to_char(v.fecha, 'YYYY-MM-DD') AS fecha,
         v.cliente_id,
         c.nombre || ' ' || c.apellido AS cliente,
         v.producto_id,
         i.nombre AS producto,
         v.cantidad,
         v.total
  FROM ventas v
  JOIN clientes c ON c.id = v.cliente_id
  JOIN inventario i ON i.id = v.producto_id`;

export class CompraModel {

  static async obtenerTodos(): Promise<Compra[]> {

    const result = await pool.query(CONSULTA_COMPRAS + ' ORDER BY v.id');

    return result.rows;
  }

  static async obtenerPorId(
    id: number
  ): Promise<Compra | null> {

    const result = await pool.query(CONSULTA_COMPRAS + ' WHERE v.id = $1', [id]);

    return result.rows[0] || null;
  }

  // Valida cliente, producto y stock; si algo falla lanza un Error con el motivo
  static async crear(
    compra: Compra
  ): Promise<Compra> {

    const cliente = await ClienteModel.obtenerPorId(Number(compra.cliente_id));

    if (!cliente) {
      throw new Error('El cliente no existe');
    }

    const producto = await ProductoModel.obtenerPorId(Number(compra.producto_id));

    if (!producto) {
      throw new Error('El producto no existe');
    }

    const cantidad = Number(compra.cantidad);

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error('La cantidad debe ser un número entero mayor a 0');
    }

    if (producto.stock < cantidad) {
      throw new Error(`Stock insuficiente, solo quedan ${producto.stock} unidades`);
    }

    await pool.query(
      'UPDATE inventario SET stock = stock - $1 WHERE id = $2',
      [cantidad, producto.id]
    );

    const result = await pool.query(
      `INSERT INTO ventas (cliente_id, producto_id, cantidad, precio_unitario)
       VALUES ($1, $2, $3, $4)
       RETURNING id, cliente_id, producto_id, cantidad, total, fecha`,
      [cliente.id, producto.id, cantidad, producto.precio]
    );

    return result.rows[0];
  }

  // Al eliminar una compra se devuelven las unidades al inventario
  static async eliminar(
    id: number
  ): Promise<boolean> {

    const compra = await CompraModel.obtenerPorId(id);

    if (!compra) {
      return false;
    }

    await pool.query('DELETE FROM ventas WHERE id = $1', [id]);

    await pool.query(
      'UPDATE inventario SET stock = stock + $1 WHERE id = $2',
      [compra.cantidad, compra.producto_id]
    );

    return true;
  }
}
