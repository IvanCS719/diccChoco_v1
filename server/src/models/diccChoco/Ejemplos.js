import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
//import { Palabras } from './Palabras.js';

export const Ejemplos = sequelize.define('Ejemplos', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ejemplo_neutro:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    ejemplo_choco:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    ejemplo_neutro_ingles:{
        type: DataTypes.TEXT,
        defaultValue: 'No translation yet',
        allowNull: true
    },
    ejemplo_choco_ingles:{
        type: DataTypes.TEXT,
        defaultValue: 'No translation yet',
        allowNull: true
    },
}, { timestamps: false });
