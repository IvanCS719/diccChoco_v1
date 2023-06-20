import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
//import { Palabras } from './Palabras.js';

export const EjemplosIng = sequelize.define('EjemplosIng', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
