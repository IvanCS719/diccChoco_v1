import { Router } from "express";
import {getPalabras, getAllPalabras,createPalabra, updatePalabra, deletePalabra, getPalabra, getCategoriagra} from "../../controllers/diccChoco/palabras.controller.js";

const router = Router();

router.get('/palabras', getPalabras);
router.post('/palabras', createPalabra);
router.put('/palabras/:id', updatePalabra);
router.delete('/palabras/:id', deletePalabra);
router.get('/palabra/:id', getPalabra);

router.get('/palabrasall', getAllPalabras);
router.get('/categoriagra', getCategoriagra);


export default router;
