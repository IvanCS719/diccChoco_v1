import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
//import { Palabras } from './Palabras.js';

export const Categoria = sequelize.define('Categoria', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoria:{
        type: DataTypes.STRING
    },
    categoriaIng:{
        type: DataTypes.STRING
    }
}, { timestamps: false });

// Array con los datos a insertar
/*const usersData = [
    { categoria: 'Sustantivo', categoriaIng: 'Noun' },
    { categoria: 'Adjetivo', categoriaIng: 'Adjective' },
    { categoria: 'Verbo', categoriaIng: 'Verb' }
  ];
  
  // Sincroniza los modelos con la base de datos y crea las tablas
  sequelize.sync({ force: true })
    .then(() => {
      return Categoria.bulkCreate(usersData);
    })
    .then(() => {
      console.log('Datos insertados exitosamente!');
      // Aquí puedes realizar otras operaciones con las tablas
    })
    .catch(err => {
      console.error('Error al crear las tablas y insertar los datos:', err);
    });*/

