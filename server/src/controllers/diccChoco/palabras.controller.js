import { Categoria } from "../../models/diccChoco/Categoria.js";
import { CategoriaIng } from "../../models/diccChoco/CategoriaIngle.js";
import { EjemplosIng } from "../../models/diccChoco/EjemplosIngle.js";
import { Colaborador } from "../../models/diccChoco/Colaborador.js";
import { Palabras } from "../../models/diccChoco/Palabras.js";
import { Ingle } from "../../models/diccChoco/Ingle.js";
//import { Region } from "../../models/diccChoco/Region.js";
import { Tipo } from "../../models/diccChoco/Tipo.js";
//import { Multimedia } from "../../models/diccChoco/Multimedia.js";
import { Ejemplos } from "../../models/diccChoco/Ejemplos.js";
import { Op } from "sequelize";


export const getPalabras = async (req, res) => {
    
    try {
        const arrPalabras = await Palabras.findAll({
            where:{
                autorizado: true,
            },
            attributes: ['id','palabra',
            'significado',
            'acepciones',
            'sinonimos',
            'como_se_usa'],
            include: [
                  {
                    model: Ejemplos,
                    required: true, 
                    
                     // Utilizar INNER JOIN
                  },
                  
                  {
                    model: Colaborador,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: Categoria,
                    required: true,
                    include:[
                      {
                        model: CategoriaIng,
                        required: true,
                      }
                    ] // Utilizar INNER JOIN
                  }, {
                    model: Tipo,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: Ingle,
                    required: false, // Utilizar INNER JOIN
                  },
                  {
                    model: EjemplosIng,
                    required: false,
                  },
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
                    model: Ejemplos,
                    required: true, // Utilizar INNER JOIN
                  },
                  
                  {
                    model: Colaborador,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: Categoria,
                    required: true,
                    include:[
                      {
                        model: CategoriaIng,
                        required: true,
                      }
                    ] // Utilizar INNER JOIN
                  }, {
                    model: Tipo,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: Ingle,
                    required: false, // Utilizar INNER JOIN
                  },
                  {
                    model: EjemplosIng,
                    required: false,
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
        significadoIng,
        acepciones,
        acepcionesIng,
        sinonimos,
        sinonimosIng,
        como_se_usa,
        como_se_usa_Ing,
        autorizado,
        ejemplo_neutro,
        ejemplo_choco,
        ejemplo_neutro_ingles,
        ejemplo_choco_ingles,
        colaborador,
        correo_electronico,
        id_categoria,
        id_tipo
        } = req.body;

    const newPalabra = await Palabras.create({
        palabra,
        significado,
        acepciones,
        sinonimos,
        como_se_usa,
        autorizado,
        id_categoria,
        id_tipo
    });

  /*  const newMultimedia = await Multimedia.create({
        id_palabras: newPalabra.id,
        url_sonido,
        url_imagen,
    }); */

    const newEjemplos = await Ejemplos.create({
            id_palabras: newPalabra.id,
            ejemplo_neutro: ejemplo_neutro,
            ejemplo_choco: ejemplo_choco

});

const newEjemplosIng = await EjemplosIng.create({
  id_palabras: newPalabra.id,    
  ejemplo_neutro_ingles:ejemplo_neutro_ingles,
  ejemplo_choco_ingles:ejemplo_choco_ingles,  

});

const newIngles = await Ingle.create({
    id_palabras: newPalabra.id,
    significadoIng:significadoIng,
    acepcionesIng:acepcionesIng,
    sinonimosIng:sinonimosIng,
    como_se_usa_Ing:como_se_usa_Ing,

});
    
    const newColaborador = await Colaborador.create({
        id_palabras: newPalabra.id,
        colaborador,
        correo_electronico,
    });

    const response = [newPalabra, newEjemplos, newIngles,newEjemplosIng, newColaborador];

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
            significadoIng,
            acepciones,
            acepcionesIng,
            sinonimos,
            sinonimosIng,
            como_se_usa,
            como_se_usa_Ing,
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
            ejemplo_neutro_ingles,
            ejemplo_choco_ingles,} = req.body;

            const updatePalabra = await Palabras.update({ 
                palabra: palabra,
                significado: significado,
                acepciones: acepciones,
                sinonimos: sinonimos,
                como_se_usa: como_se_usa,
                autorizado: autorizado,
                id_categoria: id_categoria,
                id_tipo: id_tipo
            }, {
                where: {
                  id: id
                }
              });

          /*  const updateMultimedia = await Multimedia.update({ 
                url_sonido: url_sonido,
                url_imagen: url_imagen,
            }, {
                where: {
                  id: id_multimedia
                }
              });*/

            const updateEjemplo = await Ejemplos.update({ 
                ejemplo_neutro: ejemplo_neutro,
                ejemplo_choco: ejemplo_choco
            }, {
                where: {
                  id_palabras: id
                }
              });

              const updateEjemploIng = await EjemplosIng.update({ 
               
                ejemplo_choco_ingles: ejemplo_choco_ingles,
                ejemplo_neutro_ingles: ejemplo_neutro_ingles
            }, {
                where: {
                  id_palabras: id
                }
              });

              const updateIngles = await Ingle.update({ 
                significadoIng: significadoIng,
                acepcionesIng: acepcionesIng,
                sinonimosIng: sinonimosIng,
                como_se_usa_Ing: como_se_usa_Ing,
            }, {
                where: {
                  id_palabras: id
                }
              });

            const updateColaborador = await Colaborador.update({ 
                colaborador: colaborador,
                correo_electronico: correo_electronico,
            }, {
                where: {
                  id_palabras: id
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
        const response = [updatePalabra, updateEjemplo, updateIngles, updateEjemploIng,updateColaborador];
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
   
    /* await Multimedia.destroy({
        where:{
            id_palabras: id
        }
    }); */

    await Ejemplos.destroy({
        where:{
            id_palabras: id
        }
    });

    await Ingle.destroy({
        where:{
            id_palabras: id
        }
    });

    await EjemplosIng.destroy({
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

export const getCategoriagra = async (req, res) => {
    
    try {
        const arrPalabras = await Categoria.findAll();
        res.json(arrPalabras);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getAllPalabras = async (req, res) => {
    
    try {
        const arrPalabras = await Palabras.findAll({ 
            attributes: ['id','palabra',
            'significado',
            'acepciones',
            'sinonimos',
            'como_se_usa',
            'autorizado'],
            include: [
                  {
                    model: Ejemplos,
                    required: true,
                    // Utilizar INNER JOIN
                  },
                  
                  {
                    model: Colaborador,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: Categoria,
                    required: true,
                    include:[
                      {
                        model: CategoriaIng,
                        required: true,
                      }
                    ] // Utilizar INNER JOIN
                  }, {
                    model: Tipo,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: Ingle,
                    required: true, // Utilizar INNER JOIN
                  },
                  {
                    model: EjemplosIng,
                    required: false,
                  },
              ],
              order: [['id', 'DESC']],
        });
        res.json(arrPalabras);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
