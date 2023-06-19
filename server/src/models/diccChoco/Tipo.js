import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
//import { Palabras } from './Palabras.js';

export const Tipo = sequelize.define('Tipo', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo:{
        type: DataTypes.STRING
    },
    
},
{ timestamps: false });


// Array con los datos a insertar
/*const usersData = [
    { tipo: 'Palabra'},
    { tipo: 'Frase o Modismo'}
  ];
  
  // Sincroniza los modelos con la base de datos y crea las tablas
  sequelize.sync({ force: true })
    .then(() => {
      return Tipo.bulkCreate(usersData);
    })
    .then(() => {
      console.log('Datos insertados exitosamente!');
      // Aquí puedes realizar otras operaciones con las tablas
    })
    .catch(err => {
      console.error('Error al crear las tablas y insertar los datos:', err);
    });*/