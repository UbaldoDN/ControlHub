import LessonServices from "../services/LessonServices.js";

const index = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de lecciones." })
    }
};

const store = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar la lección.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar la lección.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener la lección." })
    }
};

const destroy = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar la lección." })
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