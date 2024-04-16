import { body, param, validationResult } from "express-validator";
import UserServices from "../services/UserServices.js";

const handle = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
    }

    next();
};

const validateFields = [
    body("firstName")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("El nombre es requerido.")
        .isLength({ min: 5, max: 30 })
        .withMessage('El nombre debe tener entre 5 y 30 caracteres.'),
    body("lastName")
        .trim()
        .isString()
        .notEmpty()
        .withMessage("El apellido es requerido.")
        .isLength({ min: 5, max: 50 })
        .withMessage('El apellido debe tener entre 5 y 50 caracteres.'),
    body('role')
        .trim()
        .isString()
        .notEmpty()
        .withMessage("El rol es requerido.")
        .isLength({ min: 5, max: 7 })
        .withMessage('El rol debe tener entre 5 y 7 caracteres.')
        .isIn(["admin", "teacher", "student"])
        .withMessage('El rol solo puede ser "Admin", "Profesor" o "Estudiante"'),
];

const validateUserId = [
    param("userId")
        .isMongoId()
        .withMessage('El identificador no es válido.')
        .custom( async (value, { req }) => {
            const { userId } = req.params;
            if (!await UserServices.existsById(userId)) {
                throw new Error ('El usuario no fue encontrado.');
            }
        }),
];

const validateEmail = [
    body('email')
        .trim()
        .isString()
        .notEmpty()
        .withMessage("El correo electrónico es requerido.")
        .isLength({ min: 5, max: 70 })
        .withMessage('El correo electrónico debe tener entre 5 y 70 caracteres.')
        .isEmail()
        .withMessage('El correo electrónico no es válido.')
        .custom( async (value, { req }) => {
            if (req.method === 'POST') {
                if (await UserServices.existsByEmail(value)) {
                    throw new Error ('El correo electrónico debe ser único.');
                }
            } else {
                const { userId } = req.params;
                if (await UserServices.existsByIdAndEmail(value, userId)) {
                    throw new Error ('El correo electrónico ya está registrado.');
                }
            }
        }),
];

const validatePost = [
    [...validateEmail],
    [...validateFields],
    handle
];

const validatePut = [
    [...validateEmail],
    [...validateFields],
    [...validateUserId],
    handle
];

const validateDelete = [
    [...validateUserId],
    handle
];

const validateGet = [
    [...validateUserId],
    handle
];

export default {
    validatePost,
    validatePut,
    validateDelete,
    validateGet,
}