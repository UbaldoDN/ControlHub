import mongoose from "mongoose";

const EnrolledCourseSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrollment_date: { type: Date, default: Date.now }
});

const EnrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrolled_courses: [EnrolledCourseSchema],
    completed_courses: [EnrolledCourseSchema],
}, {
    timestamps: true
});


const Enrollment = mongoose.models?.EnrollmentSchema || mongoose.model("Enrollment", EnrollmentSchema);
export default Enrollment;