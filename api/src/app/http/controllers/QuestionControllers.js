/* import QuestionServices from "../services/QuestionServices.js";

const index = async (request, response) => {
    try {
        const questions = await QuestionServices.index();
        if (!questions) {
            return response.json([]);
        }
        
        const questionList = await Promise.all(questions.map(async (question) => {
            return await responseJsonFormat(question)
        }));

        response.json(questionList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener el listado de preguntas." })
    }
};

const store = async (request, response) => {
    try {
        const { type, content, options, correctAnswers, score } = request.body;
        const question = await QuestionServices.store(type, content, options, correctAnswers, score);
        response.status(201).json(await responseJsonFormat(question));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar la pregunta.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        const { questionId } = request.params;
        const { type, content, options, correctAnswers, score } = request.body;
        const question = await QuestionServices.update(type, content, options, correctAnswers, score, questionId);
        response.json(await responseJsonFormat(question));
    } catch (error) {
        console.log("error", error);
        response.status(500).json({ message: "Error al actualizar la pregunta.", errorMessage: error}); 
    }
};

const get = async (request, response) => {
    try {
        const { questionId } = request.params;
        const question = await QuestionServices.get(questionId);
        response.json(await responseJsonFormat(question));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al obtener la pregunta." })
    }
};

const destroy = async (request, response) => {
    try {
        const { questionId } = request.params;
        await QuestionServices.destroy(questionId);
        response.status(204).json();
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al eliminar la pregunta." })
    }
};

const responseJsonFormat = async (question) => {
    return {
        id: question._id,
        type: question.type,
        content: question.content,
        options: question.options,
        correctAnswers: question.correct_answers,
        score: question.score
    }
};

export default {
    store,
    update,
    get,
    index,
    destroy
}; */