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

const update = async (title, passingThreshold, lessonId) => {
    const lesson = await get(lessonId);
    lesson.title = title;
    lesson.passing_threshold = passingThreshold;
    
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
}