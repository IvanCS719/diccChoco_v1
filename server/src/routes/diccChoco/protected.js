import { Router } from 'express';
const router2 = Router();

import authenticateToken from '../../middleware/authenticateToken.js';

// Ruta protegida que requiere autenticación
router2.get('/recurso-protegido', authenticateToken, (req, res) => {
  // Acceder al recurso protegido aquí
  res.json({ mensaje: 'Acceso permitido al recurso protegido' });
});

export default router2;