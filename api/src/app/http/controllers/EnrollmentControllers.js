import EnrollmentServices from "../services/EnrollmentServices.js";

const index = async (request, response) => {
    try {
        const enrollments = await EnrollmentServices.list();
        if (!enrollments) {
            return response.json([]);
        }

        const enrollmentList = await Promise.all(enrollments.map(async (enrollment) => {
            return await responseJsonFormat(enrollment)
        }));

        response.json(enrollmentList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de estudiantes matriculados." })
    }
};

const store = async (request, response) => {
    try {
        const { studentId, courseId } = request.body;
        const enrollment = await EnrollmentServices.pushEnrollmentCourse(studentId, courseId);
        response.status(201).json(await responseJsonFormat(enrollment));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar la matriculación de un estudiante.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        const { studentId } = request.params;
        const enrollment = await EnrollmentServices.getByStudent(studentId);
        response.json(await responseJsonFormat(enrollment));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener la matriculación de un estudiante." })
    }
};

const destroy = async (request, response) => {
    try {
        const { studentId, courseId } = request.params;
        const enrollment = await EnrollmentServices.pullEnrollmentCourse(studentId, courseId);
        response.status(200).json(await responseJsonFormat(enrollment));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar la matriculación de un estudiante." })
    }
};

const responseJsonFormat = async (enrollment) => {
    await enrollment.populate("student enrolled_courses");
    return {
        id: enrollment._id,
        enrollmentDate: enrollment.enrollment_date,
        student: {
            id: enrollment.student._id,
            firstName: enrollment.student.first_name,
            lastName: enrollment.student.last_name,
            email: enrollment.student.email,
        },
        enrolledCourses: enrollment.enrolled_courses.map( enrolledCourse => {
            return {
                id: enrolledCourse._id,
                title: enrolledCourse.title,
                isApproved: enrolledCourse.is_approved,
                isAvailable: enrolledCourse.is_available
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