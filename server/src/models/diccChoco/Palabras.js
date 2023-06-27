import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
//import { Multimedia } from '../../models/diccChoco/Multimedia.js';
import { Ejemplos } from '../../models/diccChoco/Ejemplos.js';
import { Ingle } from '../../models/diccChoco/Ingle.js';

import { EjemplosIng } from '../../models/diccChoco/EjemplosIngle.js';

import { Region } from '../../models/diccChoco/Region.js';
import { Tipo } from '../../models/diccChoco/Tipo.js';

import { Categoria } from '../../models/diccChoco/Categoria.js';
import { Colaborador } from '../../models/diccChoco/Colaborador.js';



export const Palabras = sequelize.define('Palabras', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    palabra: {
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
Palabras.hasOne(Ejemplos, {
    foreignKey: 'id_palabras',
    sourceKey: 'id'
});

Ejemplos.belongsTo(Palabras, {
    foreignKey: 'id_palabras',
    targetId: 'id'
});


//Relación con Ingles



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
Categoria.hasMany(Palabras, {
    foreignKey: 'id_categoria',
    sourceKey: 'id'
});

Palabras.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
    targetId: 'id'
});

//Relación con Tipo
Tipo.hasMany(Palabras, {
    foreignKey: 'id_tipo',
    sourceKey: 'id'
});

Palabras.belongsTo(Tipo, {
    foreignKey: 'id_tipo',
    targetId: 'id'
});




//Relación con Colaborador
Palabras.hasOne(Colaborador, {
    foreignKey: 'id_palabras',
    sourceKey: 'id'
});

Colaborador.belongsTo(Palabras, {
    foreignKey: 'id_palabras',
    targetId: 'id'
});
/*
//Relación con Multimedia
Palabras.hasOne(Multimedia,{
    foreignKey: 'id_palabras',
    sourceKey: 'id'
});

Multimedia.belongsTo(Palabras,{
    foreignKey: 'id_palabras',
    targetId: 'id'
});*/


//Nueva tablas de traduccion, Ingles

//Relación con Ingles
try {
    Palabras.hasOne(Ingle, {
        foreignKey: 'id_palabras',
        sourceKey: 'id'
    });
    
    Ingle.belongsTo(Palabras, {
        foreignKey: 'id_palabras',
        targetId: 'id'
    });
    
    
    Palabras.hasOne(EjemplosIng, {
        foreignKey: 'id_palabras',
        sourceKey: 'id'
    });
    EjemplosIng.belongsTo(Palabras, {
        foreignKey: 'id_palabras',
        targetId: 'id'
    });
    
    let dataEjemplos = []
    Palabras.findAll({
        attributes: ['id'] // Reemplaza 'nombreColumna' con el nombre de la columna que deseas seleccionar
    })
        .then((palabras) => {
            // Aquí puedes trabajar con los registros obtenidos
            dataEjemplos = palabras;
        })
        .catch((error) => {
            console.error('Error al obtener los registros:', error);
        });
    
    sequelize.sync()
        .then(() => {
            const promises = dataEjemplos.map(dataEjemplos => {
                 try {
                    Ingle.findOrCreate({
                        where: { id_palabras: dataEjemplos.id },
                        defaults: dataEjemplos
                    });
        
                    EjemplosIng.findOrCreate({
                        where: { id_palabras: dataEjemplos.id },
                        defaults: dataEjemplos
                    });
        
                    return true
                 } catch (error) {
                    console.log("Error de insersion Ingles",error)
                    return false
                 }
            });
    
            return Promise.all(promises);
        })
        .then(() => {
            console.log('Insersion correcta!');
            // Aquí puedes realizar otras operaciones con las tablas
        })
        .catch(err => {
            console.error('Error al crear las tablas y insertar los datos:', err);
        });
    
} catch (error) {
    console.log("Error de realcion Ingles",error)
}