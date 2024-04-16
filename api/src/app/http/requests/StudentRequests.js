import { body, param, validationResult } from "express-validator";
import UserServices from "../services/UserServices.js";
import CourseServices from "../services/CourseServices.js";
import EnrollmentServices from "../services/EnrollmentServices.js";

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

const validateNotExistsEnroll = [
    param("studentId")
        .custom( async (value, { req }) => {
            const { studentId, courseId } = req.params;
            console.log(await CourseServices.get(courseId));
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
            const { studentId } = req.params;
            if ((await EnrollmentServices.getByStudent(studentId)).enrolled_courses.length === 0) {
                throw new Error ('El estudiante no se encuentra matriculado en el curso.');
            }
        }),
];

const validateList = [
    [...validateStudentId],
    handle
];

const validateEnrollList = [
    [...validateStudentId],
    [...validateExistsEnroll],
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

export default {
    validateEnrollment,
    validateUnEnrollment,
    validateGet,
    validateList,
    validateEnrollList,
}