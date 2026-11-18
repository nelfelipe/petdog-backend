import { Router } from 'express';

import { registrarUsuario } from '../controllers/usuarios.controller';

const router = Router();

router.post('/', registrarUsuario);

export default router;
