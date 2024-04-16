import { body, param, validationResult } from "express-validator";
import CourseServices from "../services/CourseServices.js";

const handle = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
    }

    next();
};

const validateTitle = [
    body('title')
        .trim()
        .isString()
        .notEmpty()
        .withMessage("El nombre del curso es requerido.")
        .isLength({ min: 5, max: 50 })
        .withMessage('El nombre del curso debe tener entre 5 y 50 caracteres.')
        .custom( async (value, { req }) => {
            if (req.method === 'POST') {
                if (await CourseServices.existsByTitle(value)) {
                    throw new Error ('El curso debe ser único.');
                }
            } else {
                const { courseId } = req.params;
                if (await CourseServices.existsByIdAndTitle(value, courseId)) {
                    throw new Error ('El curso ya está registrado.');
                }
            }
        })
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
        })
];

const validateApproved = [
    body("approved")
        .isBoolean()
        .withMessage('La aprobación del curso solo acepta 2 valores: "Sí se aprobó" o "No se aprobó".')
];

const validateAvailable = [
    body("available")
        .isBoolean()
        .withMessage('La disponibilidad del curso solo acepta 2 valores: "Sí está disponible" o "No está disponible".')
];

const validatePost = [
    [...validateTitle],
    handle
];

const validatePut = [
    [...validateCourseId],
    [...validateTitle],
    handle
];

const validateDelete = [
    [...validateCourseId],
    handle
];

const validateGet = [
    [...validateCourseId],
    handle
];

const validatePutApproved = [
    [...validateCourseId],
    [...validateApproved],
    handle
];

const validatePutAvailable = [
    [...validateCourseId],
    [...validateAvailable],
    handle
];

export default {
    validatePost,
    validatePut,
    validateDelete,
    validateGet,
    validatePutApproved,
    validatePutAvailable,
    validateCourseId,
}