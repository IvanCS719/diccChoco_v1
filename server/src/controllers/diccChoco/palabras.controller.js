import { Categoria } from "../../models/diccChoco/Categoria.js";
import { Colaborador } from "../../models/diccChoco/Colaborador.js";
import { Palabras } from "../../models/diccChoco/Palabras.js";
import { Region } from "../../models/diccChoco/Region.js";
import { Tipo } from "../../models/diccChoco/Tipo.js";
import { Multimedia } from "../../models/diccChoco/Multimedia.js";
import { Ejemplos } from "../../models/diccChoco/Ejemplos.js";
import { Op } from "sequelize";




export const getPalabras = async (req, res) => {
    
    try {
        const arrPalabras = await Palabras.findAll({
            attributes: ['id','palabra',
            'significado',
            'acepciones',
            'sinonimos',
            'como_se_usa'],
            include: [
                /*{
                    model: Multimedia,
                    required: true, // Utilizar INNER JOIN
                  },*/
                  {
                    model: Ejemplos,
                    required: true, // Utilizar INNER JOIN
                  },
                  /*{
                    model: Colaborador,
                    required: true, // Utilizar INNER JOIN
                  },*/
                  /*{
                  model: Region,
                  required: true, // Utilizar INNER JOIN
                },*/{
                    model: Categoria,
                    required: true, // Utilizar INNER JOIN
                  }/*, {
                    model: Tipo,
                    required: true, // Utilizar INNER JOIN
                  },*/
              ],
        });
        res.json(arrPalabras);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


export const getPalabra = async (req, res) => {
    
    try {
        const {id} = req.params;
        const Palabra = await Palabras.findOne({
            where:{
                id: id,

            },

            attributes: ['id','palabra',
            'significado',
            'acepciones',
            'sinonimos',
            'como_se_usa'],
            include: [
                {
                    model: Multimedia,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: Ejemplos,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: Colaborador,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                  model: Region,
                  required: true, // Utilizar INNER JOIN
                },{
                    model: Categoria,
                    required: true, // Utilizar INNER JOIN
                  }, {
                    model: Tipo,
                    required: true, // Utilizar INNER JOIN
                  },
              ], 
        });
        res.json(Palabra);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

//Insertar datos a la DB
export const createPalabra = async (req, res) => {
   
   try {
    const { palabra,
        significado,
        acepciones,
        sinonimos,
        como_se_usa,
        autorizado,
        url_sonido,
        url_imagen,
        ejemplo_neutro,
        ejemplo_choco,
        colaborador,
        correo_electronico,
        id_categoria,
        id_tipo,
        id_region } = req.body;

    const newPalabra = await Palabras.create({
        palabra,
        significado,
        acepciones,
        sinonimos,
        como_se_usa,
        autorizado,
        id_categoria,
        id_tipo,
        id_region
    });

    const newMultimedia = await Multimedia.create({
        id_palabras: newPalabra.id,
        url_sonido,
        url_imagen,
    });

    const newEjemplos = await Ejemplos.create({
            id_palabras: newPalabra.id,
            ejemplo_neutro: ejemplo_neutro,
            ejemplo_choco: ejemplo_choco      

    });
    
    const newColaborador = await Colaborador.create({
        id_palabras: newPalabra.id,
        colaborador,
        correo_electronico,
    });

    const response = [newPalabra, newMultimedia, newEjemplos, newColaborador];

    res.json(response);
   } catch (error) {
    return res.status(500).json({message: error.message});
}
}

export const updatePalabra = async (req, res) => {
    
    try {
        const {id} = req.params;
        const { palabra,
            significado,
            acepciones,
            sinonimos,
            como_se_usa,
            autorizado,
            id_multimedia,
            url_sonido,
            url_imagen,
            id_ejemplos,
            ejemplo_neutro,
            ejemplo_choco,
            id_colaborador,
            colaborador,
            correo_electronico,
            id_categoria,
            id_tipo,
            id_region } = req.body;

            const updatePalabra = await Palabras.update({ 
                palabra: palabra,
                significado: significado,
                acepciones: acepciones,
                sinonimos: sinonimos,
                como_se_usa: como_se_usa,
                autorizado: autorizado,
                id_categoria: id_categoria,
                id_tipo: id_tipo,
                id_region: id_region
            }, {
                where: {
                  id: id
                }
              });

            const updateMultimedia = await Multimedia.update({ 
                url_sonido: url_sonido,
                url_imagen: url_imagen,
            }, {
                where: {
                  id: id_multimedia
                }
              });

            const updateEjemplo = await Ejemplos.update({ 
                ejemplo_neutro: ejemplo_neutro,
                ejemplo_choco: ejemplo_choco,
            }, {
                where: {
                  id: id_ejemplos
                }
              });

            const updateColaborador = await Colaborador.update({ 
                colaborador: colaborador,
                correo_electronico: correo_electronico,
            }, {
                where: {
                  id: id_colaborador
                }
              });

            /*updatePalabra.palabra = palabra;
            updatePalabra.significado = significado;
            updatePalabra.acepciones = acepciones;
            updatePalabra.sinonimos = sinonimos;
            updatePalabra.como_se_usa = como_se_usa;
            updatePalabra.autorizado = autorizado;
            updatePalabra.ejemplo_neutro = ejemplo_neutro;
            updatePalabra.ejemplo_ingles = ejemplo_ingles;
            updatePalabra.ejemplo_choco = ejemplo_choco;
            updatePalabra.url_sonido = url_sonido;
            updatePalabra.url_imagen = url_imagen;
            updatePalabra.id_categoria = id_categoria;
            updatePalabra.id_tipo = id_tipo;
            updatePalabra.id_region = id_region;
            
            await updatePalabra.save();*/
        const response = [updatePalabra, updateEjemplo,updateMultimedia, updateColaborador];
        res.json(response);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}

//Eliminar una palabra con sus respectivas relaciones
export const deletePalabra = async (req, res) =>{
    try {
        //Se obtiene el parametro id de la palabra a eliminar
        const {id} = req.params;
    
    //Primero se elimnan los registros de las tablas relacionadas que tengan el id
    await Multimedia.destroy({
        where:{
            id_palabras: id
        }
    });

    await Ejemplos.destroy({
        where:{
            id_palabras: id
        }
    });

    await Colaborador.destroy({
        where:{
            id_palabras: id
        }
    });

    //Finalmente se elimina la palabra
    await Palabras.destroy({
        where:{
            id: id,
        } 
    });
    res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}




