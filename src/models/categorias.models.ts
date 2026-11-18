import { pool } from '../config/db.config';

export interface Categoria {
  id?: number;
  nombre: string;
}

export class CategoriaModel {

  static async obtenerTodos(): Promise<Categoria[]> {

    const result = await pool.query('SELECT * FROM categorias ORDER BY id');

    return result.rows;
  }
}
