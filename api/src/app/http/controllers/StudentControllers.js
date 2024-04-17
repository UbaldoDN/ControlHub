import CourseServices from "../services/CourseServices.js";
import EnrollmentServices from "../services/EnrollmentServices.js";

const getAllCourses = async (request, response) => {
    try {
        const courses = await CourseServices.list();
        if (!courses) {
            return response.json([]);
        }

        const coursesAvailables = courses.filter(course => course.is_available);
        if (coursesAvailables.length === 0) {
            return response.json([]);
        }
        
        const courseList = await Promise.all(coursesAvailables.map(async (course) => {
            return await responseJsonFormat(course)
        }));

        response.json(courseList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de cursos." })
    }
};

const getCourse = async (request, response) => {
    try {
        const { courseId } = request.params;
        const course = await CourseServices.get(courseId);
        response.json(await responseJsonFormat(course));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener un curso." })
    }
};

const enroll = async (request, response) => {
    try {
        const { studentId, courseId } = request.params;
        const student = await EnrollmentServices.getByStudent(studentId);
        if (!student) {
            await EnrollmentServices.store(studentId, courseId);
        } else {
            await EnrollmentServices.pushEnrollmentCourse(studentId, courseId);  
        }

        response.json({ message: "Te matriculaste del curso exitosamente."});
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al matricular a un estudiante y un curso." })
    }
};

const unenroll = async (request, response) => {
    try {
        const { studentId, courseId } = request.params;
        await EnrollmentServices.pullUnEnrollmentCourse(studentId, courseId);
        response.json({ message: "Te desmatriculaste del curso exitosamente."});
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al matricular a un estudiante y un curso." })
    }
};

const getEnrolls = async (request, response) => {
    try {
        const { studentId } = request.params;
        const student = await EnrollmentServices.getByStudent(studentId);
        response.json(await responseJsonFormatEnrolls(student));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al matricular a un estudiante y un curso." })
    }
};

const responseJsonFormat = async (course) => {
    let populateRelations = [];
    if (course.lessons && course.lessons.length > 0) {
        await course.populate("lessons");
        populateRelations = await Promise.all(await course.lessons.filter(lesson => lesson.is_available).map( async (lesson) => {
            await lesson.populate("questions");
            const questions = await Promise.all(
                lesson.questions.map(async (question) => {
                    return await {
                        id: question._id,
                        type: question.type,
                        content: question.content,
                        answers: question.answers,
                        correctAnswers: question.correct_answers,
                        points: question.points
                    }
                })
            );

            return {
                id: lesson._id,
                title: lesson.title,
                threshold: lesson.threshold,
                isAvailable: lesson.is_available,
                questions: questions
            }
        }));
    }

    return {
        id: course._id,
        title: course.title,
        isApproved: course.is_approved,
        isAvailable: course.is_available,
        lessons: populateRelations
    }
};

const responseJsonFormatEnrolls = async (enroll) => {
    let populateRelations = [];
    await enroll.populate("student");
    if (enroll.enrolled_courses && enroll.enrolled_courses.length > 0) {
        await enroll.populate("enrolled_courses");
        populateRelations = enroll.enrolled_courses.map(course => {
            return {
                id: course._id,
                title: course.title,
                isApproved: course.is_approved,
                isAvailable: course.is_available
            }
        });
    }

    console.log(enroll);
    return {
        id: enroll.student._id,
        firstName: enroll.student.first_name,
        lastName: enroll.student.last_name,
        email: enroll.student.email,
        enrolledCourses: populateRelations
    }
};

export default {
    getEnrolls,
    enroll,
    unenroll,
    getCourse,
    getAllCourses,
};
