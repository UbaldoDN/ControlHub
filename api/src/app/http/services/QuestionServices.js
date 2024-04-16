import Question from "../../models/Question.js";

const store = async (type, content, options, correctAnswers, score) => {
    const question = new Question({
        type: type,
        content: content,
        options: options,
        correct_answers: correctAnswers,
        score: score
    });

    return await question.save();
}

const update = async (type, content, options, correctAnswers, score, questionId) => {
    const question = await get(questionId);
    question.type = type;
    question.content = content;
    question.options = options;
    question.correct_answers = correctAnswers;
    question.score = score;
    
    return await question.save();
}

const destroy = async (questionId) => {
    return await Question.deleteOne({ _id: questionId });
}

const get = async (questionId) => {
    return await Question.findById(questionId);
}

const list = async () => {
    return await Question.find({});
}

export default {
    destroy,
    store,
    update,
    get,
    list,
}