import CouserServices from "../services/CourseServices.js";

const index = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de cursos." })
    }
};

const store = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar un curso.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar un curso.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener un curso." })
    }
};

const destroy = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar un curso." })
    }
};

const responseJsonFormat = async (menuItem) => {
    return {
        
    }
};

export default {
    store,
    update,
    get,
    index,
    destroy
};