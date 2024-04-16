import QuestionServices from "../services/QuestionServices.js";

const index = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de preguntas." })
    }
};

const store = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar la pregunta.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar la pregunta.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener la pregunta." })
    }
};

const destroy = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar la pregunta." })
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