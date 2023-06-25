import { Router } from "express";
import { iniciarSesion, getRolData,registro } from "../../controllers/diccChoco/login.controller.js";

const router = Router();

router.post('/chocologin', iniciarSesion);
router.get('/user', getRolData);
router.post('/chocoregister', registro);

export default router;