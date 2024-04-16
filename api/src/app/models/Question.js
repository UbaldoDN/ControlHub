import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    type: { type: String, enum: ['boolean', 'single', 'multiple', 'all'], required: true },
    question: { type: String, required: true },
    answers: [{ type: String, required: true }],
    correct_answers: [{ type: String, required: true }],
    points: { type: Number, required: true, min: 0 },
}, {
    timestamps: true
});


const Question = mongoose.models?.Question || mongoose.model("Question", QuestionSchema);
export default Question;