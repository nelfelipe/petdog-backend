import { pool } from '../config/db.config';

export interface Producto {
  id?: number;
  codigo: string;
  nombre: string;
  categoria: string;
  tamano: string;
  precio: number;
  stock: number;
}

// Trae los productos con el NOMBRE de la categoría (no el número)
const CONSULTA_PRODUCTOS = `
  SELECT i.id, i.codigo, i.nombre, c.nombre AS categoria, i.tamano, i.precio, i.stock
  FROM inventario i
  JOIN categorias c ON c.id = i.categoria_id`;

export class ProductoModel {

  static async obtenerTodos(): Promise<Producto[]> {

    const result = await pool.query(CONSULTA_PRODUCTOS + ' ORDER BY i.id');

    return result.rows;
  }

  static async obtenerPorId(
    id: number
  ): Promise<Producto | null> {

    const result = await pool.query(CONSULTA_PRODUCTOS + ' WHERE i.id = $1', [id]);

    return result.rows[0] || null;
  }

  // La categoría llega como nombre ("Alimento") y se busca su id en la tabla categorias
  static async crear(
    producto: Producto
  ): Promise<Producto | null> {

    const result = await pool.query(
      `INSERT INTO inventario (codigo, nombre, categoria_id, tamano, precio, stock)
       VALUES ($1, $2, (SELECT id FROM categorias WHERE nombre = $3), $4, $5, $6)
       RETURNING id`,
      [producto.codigo, producto.nombre, producto.categoria, producto.tamano, producto.precio, producto.stock]
    );

    return ProductoModel.obtenerPorId(result.rows[0].id);
  }

  static async actualizar(
    id: number,
    producto: Producto
  ): Promise<Producto | null> {

    const productoActual = await ProductoModel.obtenerPorId(id);

    if (!productoActual) {
      return null;
    }

    const datos: Producto = {
      ...productoActual,
      ...producto
    };

    await pool.query(
      `UPDATE inventario
       SET codigo = $1, nombre = $2, categoria_id = (SELECT id FROM categorias WHERE nombre = $3),
           tamano = $4, precio = $5, stock = $6
       WHERE id = $7`,
      [datos.codigo, datos.nombre, datos.categoria, datos.tamano, datos.precio, datos.stock, id]
    );

    return ProductoModel.obtenerPorId(id);
  }

  static async eliminar(
    id: number
  ): Promise<boolean> {

    const result = await pool.query('DELETE FROM inventario WHERE id = $1', [id]);

    return result.rowCount === 1;
  }
}
