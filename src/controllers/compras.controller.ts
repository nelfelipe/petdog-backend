import type { Request, Response } from 'express';
import { CompraModel } from '../models/compras.models';

export const obtenerCompras = async (req: Request, res: Response) => {
  const compras = await CompraModel.obtenerTodos();

  res.json(compras);
};

export const obtenerCompraPorId = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const compra = await CompraModel.obtenerPorId(id);

  if (!compra) {
    return res.status(404).json({
      message: 'Compra no encontrada'
    });
  }

  res.json(compra);
};

export const crearCompra = async (req: Request, res: Response) => {
  try {
    const compra = await CompraModel.crear(req.body);

    res.status(201).json(compra);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'No se pudo crear la compra'
    });
  }
};

export const eliminarCompra = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const eliminada = await CompraModel.eliminar(id);

  if (!eliminada) {
    return res.status(404).json({
      message: 'Compra no encontrada'
    });
  }

  res.status(204).send();
};
