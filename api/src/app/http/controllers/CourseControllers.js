import CourseServices from "../services/CourseServices.js";

const index = async (request, response) => {
    try {
        const courses = await CourseServices.list();
        if (!courses) {
            return response.json([]);
        }
        
        const courseList = await Promise.all(courses.map(async (course) => {
            return await responseJsonFormat(course)
        }));

        response.json(courseList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de cursos." })
    }
};

const store = async (request, response) => {
    try {
        const { title } = request.body;
        const course = await CourseServices.store(title, false, false, []);
        response.status(201).json(await responseJsonFormat(course));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar un curso.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {
        const { courseId } = request.params;
        const { title } = request.body;
        const course = await CourseServices.update(title, courseId);
        response.json(await responseJsonFormat(course));
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar un curso.", errorMessage: error}); 
    }
};

const updateApproved = async (request, response) => {
    try {
        const { courseId } = request.params;
        const { approved } = request.body;
        const course = await CourseServices.updateApproved(approved, courseId);
        response.json(await responseJsonFormat(course));
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar la aprobación del curso.", errorMessage: error}); 
    }
};

const updateAvailable = async (request, response) => {
    try {
        const { courseId } = request.params;
        const { available } = request.body;
        const course = await CourseServices.updateAvailable(available, courseId);
        response.json(await responseJsonFormat(course));
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar la disponibilidad del curso.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        const { courseId } = request.params;
        const course = await CourseServices.get(courseId);
        response.json(await responseJsonFormat(course));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener un curso." })
    }
};

const destroy = async (request, response) => {
    try {
        const { courseId } = request.params;
        await CourseServices.destroy(courseId);
        response.status(204).json();
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar un curso." })
    }
};

const responseJsonFormat = async (course) => {
    //await course.populate("lessons");
    return {
        id: course._id,
        title: course.title,
        isApproved: course.is_approved,
        isAvailable: course.is_available,
        /*lessons: course.lessons.map( lesson => {
            return {
                id: lesson._id,
                title: lesson.title,
                passingThreshold: lesson.passing_threshold,
                isAvailable: lesson.is_available
            }
        } )*/
    }
};

export default {
    store,
    update,
    updateApproved,
    updateAvailable,
    get,
    index,
    destroy
};