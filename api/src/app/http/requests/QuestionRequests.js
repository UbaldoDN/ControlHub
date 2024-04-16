import { body, param, validationResult } from "express-validator";
import QuestionServices from "../services/QuestionServices.js";

const handle = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
    }

    next();
};

const validateQuestionId = [
    param("questionId")
        .isMongoId()
        .withMessage('El identificador no es válido.')
        .custom( async (value, { req }) => {
            const { questionId } = req.params;
            if (!await QuestionServices.existsById(questionId)) {
                throw new Error ('La pregunta no fue encontrada.');
            }
        })
];

const validateQuestion = [
    body('content')
        .trim()
        .isString()
        .notEmpty()
        .withMessage("La pregunta es requerida.")
        .isLength({ min: 5, max: 255 })
        .withMessage('La pregunta debe tener entre 5 y 255 caracteres.')
        .custom( async (value, { req }) => {
            if (req.method === 'POST') {
                if (await QuestionServices.existsByContent(value)) {
                    throw new Error ('La pregunta debe ser única.');
                }
            } else {
                const { questionId } = req.params;
                if (await QuestionServices.existsByIdAndContent(value, questionId)) {
                    throw new Error ('La pregunta ya está registrada.');
                }
            }
        })
];

const validateType = [
    body('type')
        .trim()
        .notEmpty()
        .isIn(['boolean', 'single', 'multiple', 'all'])
        .withMessage('Las preguntas solo pueden ser de tipo "Verdadero o Falso", "De una sola respuesta correcta", "De multiples respuestas correctas" o "De multiples pero todas las respuestas correctas"')
];

const validateFields = [
    body('answers')
        .isArray({ min: 2})
        .withMessage('Debes ingresar por lo menos 2 respuestas.')
        .custom( async (answers, { req }) => {
            if (new Set(answers).size !== answers.length) {
                throw new Error('Las respuestas no deben repetirse.');
            }
        
            if (answers.includes(null) || answers.includes(undefined)) {
                throw new Error('Las respuestas no deben contener valores nulos o indefinidos.');
            }

            const { correctAnswers } = req.body;
            const isValid = correctAnswers.every(correctAnswer => answers.includes(correctAnswer));
            if (!isValid) {
                throw new Error('Las respuestas correctas deben estar entre las respuestas ingresadas.');
            }
        }),
    body('correctAnswers')
        .isArray({ min: 1 })
        .withMessage('Debe seleccionar mínimo 1 respuesta correcta.')
        .custom(async (correctAnswers, { req }) => {
            if (new Set(correctAnswers).size !== correctAnswers.length) {
                throw new Error('Las respuestas correctas no deben repetirse.');
            }
        
            if (correctAnswers.includes(null) || correctAnswers.includes(undefined)) {
                throw new Error('Las respuestas correctas no deben contener valores nulos o indefinidos.');
            }

            const { answers } = req.body;
            const isValid = correctAnswers.every(correctAnswer => answers.includes(correctAnswer));
            if (!isValid) {
                throw new Error('Las respuestas correctas deben estar entre las respuestas ingresadas.');
            }
        }),
    body("points")
        .isInt({ min: 0, max: 100 })
        .withMessage('Los puntos que pueden obtener debe ser un número entre 0 y 100, sin decimales.'),
];

const validatePost = [
    [...validateQuestion],
    [...validateType],
    [...validateFields],
    handle
];

const validatePut = [
    [...validateQuestionId],
    [...validateQuestion],
    [...validateType],
    [...validateFields],
    handle
];

const validateDelete = [
    [...validateQuestionId],
    handle
];

const validateGet = [
    [...validateQuestionId],
    handle
];

export default {
    validatePost,
    validatePut,
    validateDelete,
    validateGet,
    validateQuestionId,
}