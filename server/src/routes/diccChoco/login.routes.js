import { Router } from "express";
import { iniciarSesion, getRolData,registro, getAllCola, deleteCola, updateCola } from "../../controllers/diccChoco/login.controller.js";

const router = Router();

router.post('/chocologin', iniciarSesion);
router.post('/user', getRolData);
router.get('/allcola', getAllCola);
router.post('/chocoregister', registro);
router.delete('/deletecola/:id', deleteCola);
router.put('/updatecola/:id', updateCola)

export default router;