import CourseServices from "../services/CourseServices.js";
import EnrollmentServices from "../services/EnrollmentServices.js";
import LessonServices from "../services/LessonServices.js";
import QuestionServices from "../services/QuestionServices.js";

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

        await CourseServices.pushStudentId(studentId, courseId);

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
        await CourseServices.pullStudentId(studentId, courseId);
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

const answerLesson = async (request, response) => {
    try {
        const { studentId, courseId, lessonId } = request.params;
        const { answers } = request.body;
        const lesson = await LessonServices.get(lessonId);
        const threshold = await getThreshold(lesson, answers);
        if (threshold > lesson.threshold) {
            await LessonServices.approved(lessonId, true);
            await EnrollmentServices.pushCompletedCourse(studentId, courseId);
        }
        
        response.json({ message: `Terminaste el curso con calificación ${threshold}.`});
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al calificar las preguntas del estudiante." })
    }
};

const getThreshold = async (lesson, answers) => {
    try {
        await lesson.populate("questions");

        const totalPoints = lesson.questions.reduce((acc, question) => {
            return acc + question.points;
        }, 0);

        let answerPoints = 0;

        for (let answer of answers) {
            const question = await QuestionServices.get(answer.questionId);
            switch (question.type) {
                case 'boolean':
                    if (question.correct_answers.includes(answer.selectedAnswers)) {
                        answerPoints += question.points;
                    }
                    break;
                case 'single':
                    if (question.correct_answers.includes(answer.selectedAnswers)) {
                        answerPoints += question.points;
                    }
                    break;
                case 'multiple':
                    const correctCount = question.correct_answers.length;
                    const studentCount = answer.selectedAnswers.length;
    
                    let correctStudentCount = question.correct_answers.filter(correctAnswer => answer.selectedAnswers.includes(correctAnswer)).length;
    
                    if (correctStudentCount === correctCount && studentCount === correctCount) {
                        answerPoints += question.points;
                    } else if (correctStudentCount > 0) {
                        answerPoints += (question.points / 2);
                    }
                    break;
                case 'all':
                    const correctStudentCountAll = question.correct_answers.filter(correctAnswer => answer.selectedAnswers.includes(correctAnswer)).length;
    
                    if (correctStudentCountAll === question.correct_answers.length && answer.selectedAnswers.length === question.correct_answers.length) {
                        answerPoints += question.points;
                    }
                    break;
                default:
                    break;
            }
        }

        return (totalPoints / answerPoints) * 100;
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al calificar las preguntas del estudiante." })
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
        await enroll.populate("enrolled_courses.course");
        populateRelations = enroll.enrolled_courses.map(course => {
            return {
                id: course.course._id,
                title: course.course.title,
                isApproved: course.course.is_approved,
                isAvailable: course.course.is_available
            }
        });
    }

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
    answerLesson,
};
