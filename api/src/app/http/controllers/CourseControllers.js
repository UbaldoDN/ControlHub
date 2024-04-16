import CourseServices from "../services/CourseServices.js";

const index = async (request, response) => {
    try {
        const courses = await CouserServices.index();
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
        const { title, isApproved, isAvailable, lessons } = request.body;
        const course = await CourseServices.store(title, isApproved, isAvailable, lessons);
        response.status(201).json(await responseJsonFormat(course));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar un curso.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {
        const { courseId } = request.params;
        const { title, isApproved, isAvailable, lessons } = request.body;
        const course = await CourseServices.update(title, isApproved, isAvailable, lessons, courseId);
        response.json(await responseJsonFormat(course));
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar un curso.", errorMessage: error}); 
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
    await course.populate("lessons");
    return {
        id: course._id,
        isApproved: course.is_approved,
        isAvailable: course.is_available,
        lessons: course.lessons.map( lesson => {
            return {
                id: lesson._id,
                title: lesson.title,
                passingThreshold: lesson.passing_threshold,
                isAvailable: lesson.is_available
            }
        } )
    }
};

export default {
    store,
    update,
    get,
    index,
    destroy
};