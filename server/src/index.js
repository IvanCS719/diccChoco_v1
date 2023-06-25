import app from './app.js';
import { sequelize } from './database/database.js';

/*import './models/diccChoco/Palabras.js';
import './models/diccChoco/Ejemplos.js';
//import './models/diccChoco/Multimedia.js';
import './models/diccChoco/Categoria.js';
import './models/diccChoco/Ingle.js';
//import './models/diccChoco/Region.js';
import './models/diccChoco/Tipo.js';
import './models/diccChoco/Colaborador.js';*/

async function main() {
    try {
        await sequelize.sync()
        app.listen(3000);
        console.log('Servidor Activo', 3000)
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

import router from './routes/diccChoco/login.routes.js';
import router2 from './routes/diccChoco/protected.js';
//import router3 from './routes/diccChoco/palabras.routes.js';

// Rutas de autenticación
app.use('/api/auth', router);

// Rutas protegidas
app.use('/api', router2);


main();