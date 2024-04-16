import Enrollment from "../../models/Enrollment.js";

const getByStudent = async (studentId) => {
    return await Enrollment.findOne({ student: studentId });
}

const existsEnrollment = async (studentId, courseId) => {
    return await Enrollment.findOne({ student: studentId, enrolled_courses: { $in: [courseId] } });
}

const store = async (studentId, courseId) => {
    const enrollment = new Enrollment({
        student: studentId,
        enrollment_date: Date.now()
    });

    enrollment.enrolled_courses.push(courseId);
    return await enrollment.save();
}

const pushEnrollmentCourse = async (studentId, courseId) => {
    const student = await getByStudent(studentId);
    student.enrolled_courses.push(courseId);
    student.enrollment_date = Date.now()
    return await student.save();
}

const pullUnEnrollmentCourse = async (studentId, courseId) => {
    const student = await getByStudent(studentId);
    const indexOf = student.enrolled_courses.indexOf(courseId);

    if (indexOf > -1) {
        student.enrolled_courses.splice(indexOf, 1);

        await student.save();
    }

    return await student;
}

export default {
    pullUnEnrollmentCourse,
    pushEnrollmentCourse,
    store,
    existsEnrollment,
    getByStudent,
}