import { Router } from 'express';

import {
  obtenerMasVendidos,
  obtenerGastoPorCliente,
  obtenerComprasPorDia
} from '../controllers/reportes.controller';

const router = Router();

router.get('/mas-vendidos', obtenerMasVendidos);

router.get('/gasto-clientes', obtenerGastoPorCliente);

router.get('/compras-por-dia', obtenerComprasPorDia);

export default router;
