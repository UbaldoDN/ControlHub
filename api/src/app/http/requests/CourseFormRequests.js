import { body, validationResult } from "express-validator";

const handle = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
    }

    next();
};

const isValidObjectId = (id) => {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
};

const validId = [
    body("courseId")
        .isMongoId()
        .withMessage('El identificador no es válido.')
        .custom( async (value, { req }) => {
            const { courseId } = req.params;
            if (!await isValidObjectId(courseId)) {
                throw new Error(`El identificador no es válido.`);
            }
        }),
    handle
];

export default {
    validId,
}