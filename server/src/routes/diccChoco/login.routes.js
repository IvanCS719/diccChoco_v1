import { Router } from "express";
import { iniciarSesion, registro } from "../../controllers/diccChoco/login.controller.js";

const router = Router();

router.post('/chocologin', iniciarSesion);
router.post('/chocoregister', registro);

export default router;