import EnrollmentServices from "../services/EnrollmentServices.js";

const index = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de estudiantes matriculados." })
    }
};

const store = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar la matriculación de un estudiante.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar la matriculación de un estudiante.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener la matriculación de un estudiante." })
    }
};

const destroy = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar la matriculación de un estudiante." })
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