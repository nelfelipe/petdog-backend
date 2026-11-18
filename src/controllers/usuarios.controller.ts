import type { Request, Response } from 'express';
import { UsuarioModel } from '../models/usuarios.models';

export const registrarUsuario = async (req: Request, res: Response) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({
      message: 'El usuario y la contraseña son obligatorios'
    });
  }

  try {
    const nuevoUsuario = await UsuarioModel.crear(usuario, contrasena);

    res.status(201).json(nuevoUsuario);
  } catch (error: any) {
    // 23505 = PostgreSQL avisa que el usuario ya existe (UNIQUE)
    if (error.code === '23505') {
      return res.status(400).json({
        message: 'Ese usuario ya existe'
      });
    }

    res.status(500).json({
      message: 'No se pudo registrar el usuario'
    });
  }
};
