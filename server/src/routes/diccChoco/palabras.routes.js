import { Router } from "express";
import {getPalabras, createPalabra, updatePalabra, deletePalabra, getPalabra} from "../../controllers/diccChoco/palabras.controller.js";

const router = Router();

router.get('/palabras', getPalabras);
router.post('/palabras', createPalabra);
router.put('/palabras/:id', updatePalabra);
router.delete('/palabras/:id', deletePalabra);
router.get('/palabra/:id', getPalabra);


export default router;
