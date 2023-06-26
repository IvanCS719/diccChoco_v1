import { Router } from "express";
import { iniciarSesion, getRolData,registro, getAllCola, deleteCola } from "../../controllers/diccChoco/login.controller.js";

const router = Router();

router.post('/chocologin', iniciarSesion);
router.get('/user', getRolData);
router.get('/allcola', getAllCola);
router.post('/chocoregister', registro);
router.delete('/deletecola/:id', deleteCola);

export default router;