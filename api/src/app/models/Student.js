import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    enrolled_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completed_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completed_lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, {
    timestamps: true
});


const Student = mongoose.models?.Student || mongoose.model("Student", StudentSchema);
export default Student;