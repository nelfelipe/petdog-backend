import { pool } from '../config/db.config';

// Consultas tomadas de database/consultas.sql
export class ReporteModel {

  // Productos más vendidos
  static async productosMasVendidos(): Promise<any[]> {

    const result = await pool.query(
      `SELECT i.nombre             AS producto,
              SUM(v.cantidad)::int AS unidades_vendidas,
              SUM(v.total)         AS dinero_recibido
       FROM ventas v
       JOIN inventario i ON i.id = v.producto_id
       GROUP BY i.nombre
       ORDER BY unidades_vendidas DESC`
    );

    return result.rows;
  }

  // Cuánto ha gastado cada cliente
  static async gastoPorCliente(): Promise<any[]> {

    const result = await pool.query(
      `SELECT c.nombre || ' ' || c.apellido AS cliente,
              COUNT(v.id)::int              AS numero_compras,
              COALESCE(SUM(v.total), 0)     AS total_gastado
       FROM clientes c
       LEFT JOIN ventas v ON v.cliente_id = c.id
       GROUP BY c.id, c.nombre, c.apellido
       ORDER BY total_gastado DESC`
    );

    return result.rows;
  }

  // Total comprado por día
  static async comprasPorDia(): Promise<any[]> {

    const result = await pool.query(
      `SELECT to_char(v.fecha, 'YYYY-MM-DD') AS dia,
              COUNT(*)::int                  AS compras,
              SUM(v.total)                   AS total_del_dia
       FROM ventas v
       GROUP BY dia
       ORDER BY dia`
    );

    return result.rows;
  }
}
