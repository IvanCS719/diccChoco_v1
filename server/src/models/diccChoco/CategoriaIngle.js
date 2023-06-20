import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
//import { Palabras } from './Palabras.js';

export const CategoriaIng = sequelize.define('CategoriaIng', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoriaIng:{
        type: DataTypes.STRING
    }
}, { timestamps: false });

// Array con los datos a insertar

  // Sincroniza los modelos con la base de datos y crea las tablas
  

