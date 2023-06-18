import express from 'express';
import palabrasRoutes from './routes/diccChoco/palabras.routes.js';
import categoriaRoutes from './routes/diccChoco/categoria.routes.js';

const app = express();

app.use((req, res, next) =>{
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//middlewares
app.use(express.json());

app.use(palabrasRoutes);
app.use(categoriaRoutes);
export default app;