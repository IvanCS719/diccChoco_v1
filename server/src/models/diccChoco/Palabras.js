import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/database.js';
import { Multimedia } from '../../models/diccChoco/Multimedia.js';
import { Ejemplos } from '../../models/diccChoco/Ejemplos.js';
import { Region } from '../../models/diccChoco/Region.js';
import { Tipo } from '../../models/diccChoco/Tipo.js';
import { Categoria } from '../../models/diccChoco/Categoria.js';
import { Colaborador } from '../../models/diccChoco/Colaborador.js';


export const Palabras = sequelize.define('Palabras', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    palabra:{
        type: DataTypes.STRING
    },
    significado: {
        type: DataTypes.TEXT
    },
    acepciones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    sinonimos: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    como_se_usa: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    autorizado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});


//Relación con Ejemplos
Palabras.hasOne(Ejemplos,{
    foreignKey: 'id_palabras',
    sourceKey: 'id'
});

Ejemplos.belongsTo(Palabras,{
    foreignKey: 'id_palabras',
    targetId: 'id'
});


//Relación con Region
Region.hasMany(Palabras,{
    foreignKey: 'id_region',
    sourceKey: 'id'
});

Palabras.belongsTo(Region,{
    foreignKey: 'id_region',
    targetId: 'id'
});


//Relación con Categoria
Categoria.hasMany(Palabras,{
    foreignKey: 'id_categoria',
    sourceKey: 'id'
});

Palabras.belongsTo(Categoria,{
    foreignKey: 'id_categoria',
    targetId: 'id'
});

//Relación con Tipo
Tipo.hasMany(Palabras,{
    foreignKey: 'id_tipo',
    sourceKey: 'id'
});

Palabras.belongsTo(Tipo,{
    foreignKey: 'id_tipo',
    targetId: 'id'
});


//Relación con Colaborador
Palabras.hasOne(Colaborador,{
    foreignKey: 'id_palabras',
    sourceKey: 'id'
});

Colaborador.belongsTo(Palabras,{
    foreignKey: 'id_palabras',
    targetId: 'id'
});

//Relación con Multimedia
Palabras.hasOne(Multimedia,{
    foreignKey: 'id_palabras',
    sourceKey: 'id'
});

Multimedia.belongsTo(Palabras,{
    foreignKey: 'id_palabras',
    targetId: 'id'
});