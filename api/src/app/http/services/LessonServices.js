import Lesson from "../../models/Lesson.js";

const store = async (title, threshold, isAvailable, questions, order) => {
    const lesson = new Lesson({
        title: title,
        threshold: threshold,
        is_available: isAvailable,
        questions: questions,
        order: order,
    });

    return await lesson.save();
}

const update = async (title, threshold, lessonId) => {
    const lesson = await get(lessonId);
    lesson.title = title;
    lesson.threshold = threshold;
    
    return await lesson.save();
}

const updateAvailable = async (available, lessonId) => {
    const lesson = await get(lessonId);
    lesson.is_available = available;
    
    return await lesson.save();
}

const destroy = async (lessonId) => {
    return await Lesson.deleteOne({ _id: lessonId });
}

const get = async (lessonId) => {
    return await Lesson.findById(lessonId);
}

const list = async () => {
    return await Lesson.find({});
}

const existsById = async (lessonId) => {
    return await Lesson.exists({ _id: lessonId });
}

const existsByTitle = async (title) => {
    return await Lesson.exists({ title: title });
}

const existsByIdAndTitle = async (title, lessonId) => {
    return await Lesson.exists({  _id: { $ne : lessonId }, title: title });
}

const pushQuestionId = async (questionId, lessonId) => {
    const lesson = await get(lessonId);
    lesson.questions.push(questionId);
    return await lesson.save();
}

const pullQuestionId = async (questionId, lessonId) => {
    const lesson = await get(lessonId);
    const indexOf = lesson.questions.indexOf(questionId);

    if (indexOf > -1) {
        lesson.questions.splice(indexOf, 1);

        await lesson.save();
    }

    return await lesson;
}

const getLastOrder = async () => {
    return await Lesson.findOne({}, {}, { sort: { 'order': -1 } })
}

export default {
    destroy,
    store,
    update,
    updateAvailable,
    get,
    list,
    existsById,
    existsByTitle,
    existsByIdAndTitle,
    pushQuestionId,
    pullQuestionId,
    getLastOrder,
}