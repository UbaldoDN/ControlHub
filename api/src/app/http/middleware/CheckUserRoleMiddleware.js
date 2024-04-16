const checkUserRole = async (routeUserRole) => {
    return (request, response, next) => {
        const userRole = request.headers['user-role'];

        if (!userRole || userRole !== routeUserRole) {
            return response.status(403).json({ message: "No tienes permisos para ingresar a está sección." });
        }

        next();
    };
};

export default checkUserRole;
