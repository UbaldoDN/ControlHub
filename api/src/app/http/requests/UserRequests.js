import { body, validationResult } from "express-validator";

const handle = async (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
    }

    next();
};

export default {
    validId,
}