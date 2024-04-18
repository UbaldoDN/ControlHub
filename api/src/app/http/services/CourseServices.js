import Course from "../../models/Course.js";

const store = async (title, isApproved, isAvailable, lessons) => {
    const lastCourse = await getLastOrder();
    const order = lastCourse && !isNaN(lastCourse.order) ? lastCourse.order + 1 : 1;

    const course = new Course({
        title: title,
        is_approved: isApproved,
        is_available: isAvailable,
        lessons: lessons,
        order: order,
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

const pushLessonId = async (lessonId, courseId) => {
    const course = await get(courseId);
    course.lessons.push(lessonId);
    return await course.save();
}

const pullLessonId = async (lessonId, courseId) => {
    const course = await get(courseId);
    const indexOf = course.lessons.indexOf(lessonId);

    if (indexOf > -1) {
        course.lessons.splice(indexOf, 1);

        await course.save();
    }

    return await course;
}

const pushStudentId = async (studentId, courseId) => {
    const course = await get(courseId);
    course.enrolled_students.push(studentId);
    return await course.save();
}

const pullStudentId = async (studentId, courseId) => {
    const course = await get(courseId);
    const indexOf = course.enrolled_students.indexOf(studentId);

    if (indexOf > -1) {
        course.enrolled_students.splice(indexOf, 1);
        await course.save();
    }

    return await course;
}

const getLastOrder = async () => {
    return await Course.findOne({}, {}, { sort: { 'order': -1 } })
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
    pushLessonId,
    pullLessonId,
    getLastOrder,
    pushStudentId,
    pullStudentId,
}