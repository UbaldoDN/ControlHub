import LessonServices from "../services/LessonServices.js";
import QuestionServices from "../services/QuestionServices.js";

const index = async (request, response) => {
    try {
        const { lessonId } = request.params;
        const lesson = await LessonServices.get(lessonId);
        if (!lesson) {
            return response.json([]);
        }
        
        await lesson.populate("questions");
        const questionList = await Promise.all(lesson.questions.map(async (question) => {
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
        const { lessonId } = request.params;
        const { type, content, answers, correctAnswers, points } = request.body;
        const question = await QuestionServices.store(type, content, answers, correctAnswers, points);
        await LessonServices.pushQuestionId(question._id, lessonId);
        response.status(201).json(await responseJsonFormat(question));
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Error al guardar la pregunta.", errorMessage: error}); 
    }
};

const update = async (request, response) => {
    try {      
        const { questionId } = request.params;
        const { type, content, answers, correctAnswers, points } = request.body;
        const question = await QuestionServices.update(type, content, answers, correctAnswers, points, questionId);
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
        answers: question.answers,
        correctAnswers: question.correct_answers,
        points: question.points
    }
};

export default {
    store,
    update,
    get,
    index,
    destroy
};