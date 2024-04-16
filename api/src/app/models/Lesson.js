import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    passing_threshold: { type: Number, required: true, min: 0, max: 100 },
    is_available: { type: Boolean, default: false },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }],
}, {
    timestamps: true
});


const Lesson = mongoose.models?.Lesson || mongoose.model("Lesson", LessonSchema);
export default Lesson;