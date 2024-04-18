import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    is_approved: { type: Boolean, default: false },
    is_available: { type: Boolean, default: false },
    order: { type: Number, required: true, unique: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true }],
    enrolled_students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
}, {
    timestamps: true
});


const Course = mongoose.models?.Course || mongoose.model("Course", CourseSchema);
export default Course;