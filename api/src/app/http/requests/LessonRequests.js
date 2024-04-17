import { body, param, validationResult } from "express-validator";
import LessonServices from "../services/LessonServices.js";

const handle = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
    }

    next();
};

const validateLessonId = [
    param("lessonId")
        .isMongoId()
        .withMessage('El identificador no es válido.')
        .custom( async (value, { req }) => {
            const { lessonId } = req.params;
            if (!await LessonServices.existsById(lessonId)) {
                throw new Error ('La lección no fue encontrada.');
            }
        })
];

const validateTitle = [
    body('title')
        .trim()
        .isString()
        .notEmpty()
        .withMessage("El nombre de la lección es requerido.")
        .isLength({ min: 5, max: 50 })
        .withMessage('El nombre de la lección debe tener entre 5 y 50 caracteres.')
        .custom( async (value, { req }) => {
            if (req.method === 'POST') {
                if (await LessonServices.existsByTitle(value)) {
                    throw new Error ('La lección debe ser única.');
                }
            } else {
                const { lessonId } = req.params;
                if (await LessonServices.existsByIdAndTitle(value, lessonId)) {
                    throw new Error ('La lección ya está registrada.');
                }
            }
        })
];

const validateAvailable = [
    body("available")
        .isBoolean()
        .withMessage('La disponibilidad de la lección solo acepta 2 valores: "Sí está disponible" o "No está disponible".')
];

const validateThreshold = [
    body("threshold")
        .isInt({ min: 0, max: 100 })
        .withMessage('El umbral de aprobación debe ser un número entre 0 y 100, sin decimales.'),
];

const validatePost = [
    [...validateTitle],
    [...validateThreshold],
    handle
];

const validatePut = [
    [...validateLessonId],
    [...validateTitle],
    [...validateThreshold],
    handle
];

const validateDelete = [
    [...validateLessonId],
    handle
];

const validateGet = [
    [...validateLessonId],
    handle
];

const validatePutAvailable = [
    [...validateLessonId],
    [...validateAvailable],
    handle
];

export default {
    validatePost,
    validatePut,
    validateDelete,
    validateGet,
    validatePutAvailable,
    validateLessonId,
}