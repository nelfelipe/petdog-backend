import type { Request, Response } from 'express';
import { ReporteModel } from '../models/reportes.models';

export const obtenerMasVendidos = async (req: Request, res: Response) => {
  const reporte = await ReporteModel.productosMasVendidos();

  res.json(reporte);
};

export const obtenerGastoPorCliente = async (req: Request, res: Response) => {
  const reporte = await ReporteModel.gastoPorCliente();

  res.json(reporte);
};

export const obtenerComprasPorDia = async (req: Request, res: Response) => {
  const reporte = await ReporteModel.comprasPorDia();

  res.json(reporte);
};
