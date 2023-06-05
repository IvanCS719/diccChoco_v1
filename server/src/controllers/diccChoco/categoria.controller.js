import { Categoria } from "../../models/diccChoco/Categoria.js";



export const getCategorias = async (req, res) => {
    
    try {
        const arrCategorias = await Categoria.findAll();
        res.json(arrCategorias);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}


export const getCategoria = async (req, res) => {
    
    try {
        const {id} = req.params;
        const categoria = await Categoria.findOne({
            where:{
                id: id
            }
        });
        res.json(categoria);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

//Insertar datos a la DB
export const createCategoria = async (req, res) => {
   
   try {
    const { categoria } = req.body;

    const newCategoria = await Categoria.create({
        categoria,  
    });

    res.json(newCategoria);
   } catch (error) {
    return res.status(500).json({message: error.message});
}
}

export const updateCategoria = async (req, res) => {
    
    try {
        const {id} = req.params;
    const { categoria } = req.body;

            const updateCategoria = await Categoria.findByPk(id);

            updateCategoria.categoria = categoria;
            
            await updateCategoria.save();
             res.json(updateCategoria);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

}

export const deleteCategoria = async (req, res) =>{
    try {
        const {id} = req.params;
    await Categoria.destroy({
        where:{
            id: id,
        },
    });
    res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}
