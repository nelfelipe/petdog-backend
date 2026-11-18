import type { Request, Response } from 'express';
import { UsuarioModel } from '../models/usuarios.models';

export const iniciarSesion = async (req: Request, res: Response) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({
      message: 'Escribe el usuario y la contraseña'
    });
  }

  const usuarioEncontrado = await UsuarioModel.validar(usuario, contrasena);

  if (!usuarioEncontrado) {
    return res.status(401).json({
      message: 'Usuario o contraseña incorrectos'
    });
  }

  // Usuario y contraseña correctos
  res.json(true);
};
