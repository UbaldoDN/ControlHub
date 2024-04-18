import Question from "../../models/Question.js";

const store = async (type, content, answers, correctAnswers, points) => {
    const question = new Question({
        type: type,
        content: content,
        answers: answers,
        correct_answers: correctAnswers,
        points: points
    });

    return await question.save();
}

const update = async (type, content, answers, correctAnswers, points, questionId) => {
    const question = await get(questionId);
    question.type = type;
    question.content = content;
    question.answers = answers;
    question.correct_answers = correctAnswers;
    question.points = points;
    
    return await question.save();
}

const destroy = async (questionId) => {
    return await Question.deleteOne({ _id: questionId });
}

const get = async (questionId) => {
    return await Question.findById(questionId);
}

const existsById = async (questionId) => {
    return await Question.exists({ _id: questionId });
}

const existsByContent = async (content) => {
    return await Question.exists({ content: content });
}

const existsByIdAndContent = async (content, questionId) => {
    return await Question.exists({  _id: { $ne : questionId }, content: content });
}

export default {
    destroy,
    store,
    update,
    get,
    existsById,
    existsByContent,
    existsByIdAndContent,
}