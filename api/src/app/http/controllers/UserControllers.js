import UserServices from "../services/UserServices.js";

const index = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de usuarios." })
    }
};

const store = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar un usuario.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar un usuario.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener un usuario." })
    }
};

const destroy = async (request, response) => {
    try {
        
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar un usuario." })
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