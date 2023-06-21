import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
//import { Palabras } from './Palabras.js';

export const LoginPanel = sequelize.define('LoginPanel', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol:{
        type: DataTypes.STRING
    },

    contrasena:{
      type: DataTypes.STRING
  },
    
},
{ timestamps: false });


// Array con los datos a insertar
/*const usersData = [
  { tipo: 'Palabra'},
  { tipo: 'Frase o Modismo'}
];

sequelize.sync()
  .then(() => {
    const promises = usersData.map(userData => {
      return Tipo.findOrCreate({
        where: { tipo: userData.tipo },
        defaults: userData
      });
    });

    return Promise.all(promises);
  })
  .then(() => {
    console.log('Datos insertados exitosamente!');
    // Aquí puedes realizar otras operaciones con las tablas
  })
  .catch(err => {
    console.error('Error al crear las tablas y insertar los datos:', err);
  });*/