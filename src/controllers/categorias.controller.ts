import type { Request, Response } from 'express';
import { CategoriaModel } from '../models/categorias.models';

export const obtenerCategorias = async (req: Request, res: Response) => {
  const categorias = await CategoriaModel.obtenerTodos();

  res.json(categorias);
};
