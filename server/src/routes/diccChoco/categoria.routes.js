import { Router } from "express";
import {getCategorias, createCategoria, updateCategoria, deleteCategoria, getCategoria } from "../../controllers/diccChoco/categoria.controller.js";

const router = Router();

router.get('/categorias', getCategorias);
router.post('/categorias', createCategoria);
router.put('/categorias/:id', updateCategoria);
router.delete('/categorias/:id', deleteCategoria);
router.get('/categpria/:id', getCategoria );

export default router;
