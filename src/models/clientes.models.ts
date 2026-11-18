import { pool } from '../config/db.config';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  edad?: number;
  sexo?: string;
  email: string;
  fecha_creacion?: Date;
}

export class ClienteModel {

  static async obtenerTodos(): Promise<Cliente[]> {

    const result = await pool.query('SELECT * FROM clientes ORDER BY id');

    return result.rows;
  }

  static async obtenerPorId(
    id: number
  ): Promise<Cliente | null> {

    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);

    return result.rows[0] || null;
  }

  static async crear(
    cliente: Cliente
  ): Promise<Cliente> {

    const result = await pool.query(
      `INSERT INTO clientes (nombre, apellido, edad, sexo, email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [cliente.nombre, cliente.apellido, cliente.edad, cliente.sexo, cliente.email]
    );

    return result.rows[0];
  }

  static async actualizar(
    id: number,
    cliente: Cliente
  ): Promise<Cliente | null> {

    const clienteActual = await ClienteModel.obtenerPorId(id);

    if (!clienteActual) {
      return null;
    }

    const datos: Cliente = {
      ...clienteActual,
      ...cliente
    };

    const result = await pool.query(
      `UPDATE clientes
       SET nombre = $1, apellido = $2, edad = $3, sexo = $4, email = $5
       WHERE id = $6
       RETURNING *`,
      [datos.nombre, datos.apellido, datos.edad, datos.sexo, datos.email, id]
    );

    return result.rows[0];
  }

  static async eliminar(
    id: number
  ): Promise<boolean> {

    const result = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);

    return result.rowCount === 1;
  }
}
