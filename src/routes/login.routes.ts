import { Router } from 'express';

import { iniciarSesion } from '../controllers/login.controller';

const router = Router();

router.post('/', iniciarSesion);

export default router;
