import Enrollment from "../../models/Enrollment.js";

const getByStudent = async (studentId) => {
    return await Enrollment.findOne({ student: studentId });
}

const existsEnrollment = async (studentId, courseId) => {
    return await Enrollment.findOne({ student: studentId, "enrolled_courses.course": courseId });
}

const store = async (studentId, courseId) => {
    const enrollment = new Enrollment({ student: studentId});

    enrollment.enrolled_courses.push({ course: courseId, enrollment_date: Date.now()});
    return await enrollment.save();
}

const pushEnrollmentCourse = async (studentId, courseId) => {
    const student = await getByStudent(studentId);
    student.enrolled_courses.push({ course: courseId, enrollment_date: Date.now()});
    return await student.save();
}

const pullUnEnrollmentCourse = async (studentId, courseId) => {
    const student = await getByStudent(studentId);
    const indexOfCourse = student.enrolled_courses.findIndex(course => course.course.equals(courseId));

    if (indexOfCourse > -1) {
        student.enrolled_courses.splice(indexOfCourse, 1);
        await student.save();
    }

    return await student;
}

const pushCompletedCourse = async (studentId, courseId) => {
    const student = await getByStudent(studentId);
    const indexOfCourse = student.enrolled_courses.findIndex(course => course.course.equals(courseId));
    
    if (indexOfCourse > -1) {
        return;
    }
    
    student.completed_courses.push({ course: courseId, enrollment_date: Date.now()});
    return await student.save();
}

const findEnrollmentCourse = async (studentId, courseId) => {
    return await Enrollment.findOne({ student: studentId, "enrolled_courses.course": courseId });
}

export default {
    pullUnEnrollmentCourse,
    pushEnrollmentCourse,
    pushCompletedCourse,
    store,
    existsEnrollment,
    getByStudent,
    findEnrollmentCourse,
}