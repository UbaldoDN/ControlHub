import { body, param, validationResult } from "express-validator";
import UserServices from "../services/UserServices.js";
import CourseServices from "../services/CourseServices.js";
import EnrollmentServices from "../services/EnrollmentServices.js";
import LessonServices from "../services/LessonServices.js";
import QuestionServices from "../services/QuestionServices.js";

const handle = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
    }

    next();
};

const validateStudentId = [
    param("studentId")
        .isMongoId()
        .withMessage('El identificador no es válido.')
        .custom( async (value, { req }) => {
            const { studentId } = req.params;
            if (!await UserServices.existsById(studentId)) {
                throw new Error ('El estudiante no fue encontrado.');
            }
        }),
];

const validateCourseId = [
    param("courseId")
        .isMongoId()
        .withMessage('El identificador no es válido.')
        .custom( async (value, { req }) => {
            const { courseId } = req.params;
            if (!await CourseServices.existsById(courseId)) {
                throw new Error ('El curso no fue encontrado.');
            }
        }),
];

const validateExistsQuestion = [
    body("answers.*.questionId")
        .isMongoId()
        .withMessage('El identificador no es válido.')
        .custom( async (value, { req }) => {
            if (!await QuestionServices.existsById(value)) {
                throw new Error ('La pregunta no fue encontrada.');
            }
        }),
];

const validateNotExistsEnroll = [
    param("studentId")
        .custom( async (value, { req }) => {
            const { studentId, courseId } = req.params;
            if (!(await CourseServices.get(courseId)).is_available) {
                throw new Error ('El curso no esta disponible.');
            }

            if (await EnrollmentServices.existsEnrollment(studentId, courseId)) {
                throw new Error ('El estudiante ya se encuentra matriculado en el curso.');
            }
        }),
];

const validateExistsEnroll = [
    param("studentId")
        .custom( async (value, { req }) => {
            const { studentId, courseId } = req.params;
            if (!await EnrollmentServices.existsEnrollment(studentId, courseId)) {
                throw new Error ('El estudiante no se encuentra matriculado en el curso.');
            }
        }),
];

const validateStudentExistsEnrollment = [
    param("studentId")
        .custom( async (value, { req }) => {
            const { studentId } = req.params;
            const enrollment = await EnrollmentServices.getByStudent(studentId);
            if (!enrollment) {
                throw new Error ('El estudiante no se encuentra matriculado en ningún curso.');
            }
            
            if ((await EnrollmentServices.getByStudent(studentId)).enrolled_courses.length === 0) {
                throw new Error ('El estudiante no se encuentra matriculado en ningún curso.');
            }
        }),
];

const validateLessonBeforeIsApproved = [
    param("lessonId")
        .custom( async (value, { req }) => {
            const { studentId, courseId, lessonId } = req.params;
            
            const lessonService = await LessonServices.get(lessonId);
            const courseService = await CourseServices.get(courseId);

            let isLessonFound = false;
            courseService.lessons.some(lesson => {
                if (lesson.toString() ===  lessonService._id.toString()) {
                    isLessonFound = true;
                    return true;
                }

                return false;
            });

            if (!isLessonFound) {
                throw new Error ('No se encontró el curso relacionado a la lección.');
            }

            const enrollment = await EnrollmentServices.findEnrollmentCourse(studentId, courseId);
            await enrollment.populate({
                path: 'enrolled_courses.course',
                populate: {
                    path: 'lessons'
                }
            });

            let isLessonPrevNoApprovedFound = false;
            enrollment.enrolled_courses.some(course => {
                course.course.lessons.some(lesson => {
                    if (lesson.order < lessonService.order) {
                        isLessonPrevNoApprovedFound = true;
                        return true;
                    }
    
                    if (lesson.order === 1 && lessonService.order === 1) {
                        isLessonPrevNoApprovedFound = true;
                        return true;
                    }
    
                    return false;
                });
            });
            
            if (!isLessonPrevNoApprovedFound) {
                throw new Error ('Debe completar y aprobar la lección anterior antes de responder a esta.');
            }
        }),
];

const validateCourseLtIsApproved = [
    param("lessonId")
        .custom( async (value, { req }) => {
            const { studentId, courseId, lessonId } = req.params;
            const courseService = await CourseServices.get(courseId);
            const enrollment = await EnrollmentServices.findEnrollmentCourse(studentId, courseId);
            await enrollment.populate("enrolled_courses.course");
            
            let isCoursePrevNoApprovedFound = false;
            enrollment.enrolled_courses.some(course => {
                if (course.course.order < courseService.order && !course.course.is_approved) {
                    isCoursePrevNoApprovedFound = true;
                    return true;
                }

                if (course.course.order === 1 && courseService.order === 1) {
                    isCoursePrevNoApprovedFound = true;
                    return true;
                }

                return false;
            });
            
            if (!isCoursePrevNoApprovedFound) {
                throw new Error ('Debe completar y aprobar el curso anterior antes de responder a esté.');
            }
        }),
];

const validateList = [
    [...validateStudentId],
    handle
];

const validateEnrollList = [
    [...validateStudentId],
    [...validateStudentExistsEnrollment],
    handle
];

const validateGet = [
    [...validateStudentId],
    [...validateCourseId],
    handle
];

const validateEnrollment = [
    [...validateStudentId],
    [...validateCourseId],
    [...validateNotExistsEnroll],
    handle
];

const validateUnEnrollment = [
    [...validateStudentId],
    [...validateCourseId],
    [...validateExistsEnroll],
    handle
];

const validateAnswer = [
    [...validateStudentId],
    [...validateCourseId],
    [...validateExistsEnroll],
    [...validateExistsQuestion],
    [...validateCourseLtIsApproved],
    [...validateLessonBeforeIsApproved],
    handle
];

export default {
    validateEnrollment,
    validateUnEnrollment,
    validateGet,
    validateList,
    validateEnrollList,
    validateAnswer,
}