import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Ingle = sequelize.define('Ingle', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    significadoIng: {
        type: DataTypes.TEXT,
        defaultValue: 'No translation yet',
        allowNull: true	
    },
    acepcionesIng: {
        type: DataTypes.TEXT,
        defaultValue: 'No translation yet',
        allowNull: true
    },
    sinonimosIng: {
        type: DataTypes.TEXT,
        defaultValue: 'No translation yet',
        allowNull: true
    },
    como_se_usa_Ing: {
        type: DataTypes.TEXT,
        defaultValue: 'No translation yet',
        allowNull: true
    },
}, { timestamps: false });
