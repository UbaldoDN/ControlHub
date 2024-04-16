import Enrollment from "../../models/Enrollment.js";

const get = async (lessonId) => {
    return await Enrollment.findById(lessonId);
}

const pullEnrollmentCourse = async (studentId, courseId) => {
    const student = await get(studentId);
    const indexOf = student.enrolled_courses.indexOf(courseId);

    if (indexOf > -1) {
        student.enrolled_courses.splice(indexOf, 1);

        await student.save();
    }

    return await student;
}

const pushEnrollment = async (studentId, keyEnrollment, typeId) => {
    const student = await get(studentId);
    student[keyEnrollment].push(typeId);
    return await student.save();
}

const pushEnrollmentCourse = async (studentId, courseId) => {
    return await pushEnrollment(studentId, "enrolled_courses", courseId);
}

const pushCompletedCourse = async (studentId, courseId) => {
    return await pushEnrollment(studentId, "completed_courses", courseId);
}

const pushCompletedLesson = async (studentId, lessonId) => {
    return await pushEnrollment(studentId, "completed_lessons", lessonId);
}

const pushCompletedQuestion = async (studentId, questionId) => {
    return await pushEnrollment(studentId, "completed_questions", questionId);
}

export default {
    get,
    pullEnrollmentCourse,
    pushEnrollmentCourse,
    pushCompletedCourse,
    pushCompletedLesson,
    pushCompletedQuestion,
}