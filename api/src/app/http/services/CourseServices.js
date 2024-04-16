import Course from "../../models/Course.js";

const store = async (title, isApproved, isAvailable, lessons) => {
    const course = new Course({
        title: title,
        is_approved: isApproved,
        is_available: isAvailable,
        lessons: lessons,
    });

    return await course.save();
}

const update = async (title, courseId) => {
    const course = await get(courseId);
    course.title = title;
    
    return await course.save();
}

const updateApproved = async (approved, courseId) => {
    const course = await get(courseId);
    course.is_approved = approved;
    
    return await course.save();
}

const updateAvailable = async (available, courseId) => {
    const course = await get(courseId);
    course.is_available = available;
    
    return await course.save();
}

const destroy = async (courseId) => {
    return await Course.deleteOne({ _id: courseId });
}

const get = async (courseId) => {
    return await Course.findById(courseId);
}

const list = async () => {
    return await Course.find({});
}

const existsById = async (courseId) => {
    return await Course.exists({ _id: courseId });
}

const existsByTitle = async (title) => {
    return await Course.exists({ title: title });
}

const existsByIdAndTitle = async (title, courseId) => {
    return await Course.exists({  _id: { $ne : courseId }, title: title });
}

export default {
    destroy,
    store,
    update,
    updateApproved,
    updateAvailable,
    get,
    list,
    existsById,
    existsByTitle,
    existsByIdAndTitle,
}