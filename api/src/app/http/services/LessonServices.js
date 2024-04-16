import Lesson from "../../models/Lesson.js";

const store = async (title, passingThreshold, isAvailable, questions) => {
    const lesson = new Lesson({
        title: title,
        passing_threshold: passingThreshold,
        is_available: isAvailable,
        questions: questions
    });

    return await lesson.save();
}

const update = async (title, passingThreshold, isAvailable, questions, lessonId) => {
    const lesson = await get(lessonId);
    lesson.title = title;
    lesson.passing_threshold = passingThreshold;
    lesson.is_available = isAvailable;
    lesson.questions = questions;
    
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

export default {
    destroy,
    store,
    update,
    get,
    list,
}