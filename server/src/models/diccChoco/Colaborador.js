import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
//import { Palabras } from './Palabras.js';

export const Colaborador = sequelize.define('Colaborador', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    colaborador:{
        type: DataTypes.STRING,
        defaultValue: "Anónimo"
    },
    correo_electronico:{
        type: DataTypes.STRING,
        defaultValue: 'Anónimo',
        allowNull: true
    }
}, { timestamps: false });


