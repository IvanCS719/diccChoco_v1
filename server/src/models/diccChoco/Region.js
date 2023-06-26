import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
//import { Palabras } from './Palabras.js';

export const Region = sequelize.define('Region', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    region:{
        type: DataTypes.STRING
    }
},{ timestamps: false });

const usersData = [
    { region: 'Todas las regiones'},
    { region: 'Centro'},
    { region: 'Chontalpa'},
    { region: 'Sierra'},
    { region: 'Ríos'},
    { region: 'Pantanos'}
  ];
  
  sequelize.sync()
    .then(() => {
      const promises = usersData.map(userData => {
        return Region.findOrCreate({
          where: { region: userData.region },
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
    });