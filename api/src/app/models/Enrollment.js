import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    enrolled_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completed_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completed_lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    completed_questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    enrollment_date: { type: Date, default: Date.now }
}, {
    timestamps: true
});


const Enrollment = mongoose.models?.EnrollmentSchema || mongoose.model("Enrollment", EnrollmentSchema);
export default Enrollment;