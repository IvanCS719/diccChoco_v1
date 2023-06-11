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

main();