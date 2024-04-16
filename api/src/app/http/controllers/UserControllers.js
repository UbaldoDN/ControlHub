import UserServices from "../services/UserServices.js";

const index = async (request, response) => {
    try {
        const users = await UserServices.list();
        if (!users) {
            return response.json([]);
        }
        
        const userList = await Promise.all(users.map(async (user) => {
            return await responseJsonFormat(user)
        }));

        response.json(userList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de usuarios." })
    }
};

const store = async (request, response) => {
    try {
        const { firstName, lastName, email, role } = request.body;
        const user = await UserServices.store(firstName, lastName, email, role);
        response.status(201).json(await responseJsonFormat(user));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar un usuario.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        const { userId } = request.params;
        const { firstName, lastName, email, role } = request.body;
        const user = await UserServices.update(firstName, lastName, email, role, userId);
        response.json(await responseJsonFormat(user));
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar un usuario.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        const { userId } = request.params;
        const user = await UserServices.get(userId);
        response.json(await responseJsonFormat(user));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener un usuario." })
    }
};

const destroy = async (request, response) => {
    try {
        const { userId } = request.params;
        await UserServices.destroy(userId);
        response.status(204).json();
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar un usuario." })
    }
};

const responseJsonFormat = async (user) => {
    return {
        id: user._id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role
    }
};

export default {
    store,
    update,
    get,
    index,
    destroy
};