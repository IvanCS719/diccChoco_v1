import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';

export const Ingle = sequelize.define('Ingle', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    significadoIng: {
        type: DataTypes.TEXT
    },
    acepcionesIng: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sinonimosIng: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    como_se_usa_Ing: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, { timestamps: false });
