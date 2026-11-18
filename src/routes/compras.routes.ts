import { Router } from 'express';

import {
  obtenerCompras,
  obtenerCompraPorId,
  crearCompra,
  eliminarCompra
} from '../controllers/compras.controller';

const router = Router();

router.get('/', obtenerCompras);

router.get('/:id', obtenerCompraPorId);

router.post('/', crearCompra);

router.delete('/:id', eliminarCompra);

export default router;
