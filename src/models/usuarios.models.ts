import { createHash } from 'crypto';
import { pool } from '../config/db.config';

export interface Usuario {
  id?: number;
  usuario: string;
  contrasena?: string;
  fecha_creacion?: Date;
}

export class UsuarioModel {

  // Guarda un usuario nuevo con la contraseña cifrada (hash SHA-256)
  static async crear(
    usuario: string,
    contrasena: string
  ): Promise<Usuario> {

    const contrasenaCifrada = createHash('sha256').update(contrasena).digest('hex');

    const result = await pool.query(
      `INSERT INTO usuarios (usuario, contrasena)
       VALUES ($1, $2)
       RETURNING id, usuario, fecha_creacion`,
      [usuario, contrasenaCifrada]
    );

    return result.rows[0];
  }

  // Busca un usuario con ese nombre y esa contraseña.
  // Si no existe o la contraseña no coincide, devuelve null.
  static async validar(
    usuario: string,
    contrasena: string
  ): Promise<Usuario | null> {

    const contrasenaCifrada = createHash('sha256').update(contrasena).digest('hex');

    const result = await pool.query(
      `SELECT id, usuario
       FROM usuarios
       WHERE usuario = $1 AND contrasena = $2`,
      [usuario, contrasenaCifrada]
    );

    return result.rows[0] || null;
  }
}
