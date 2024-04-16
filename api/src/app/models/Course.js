import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    is_approved: { type: Boolean, default: false },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true }]
}, {
    timestamps: true
});


const Course = mongoose.models?.Course || mongoose.model("Course", CourseSchema);
export default Course;