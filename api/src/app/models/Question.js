import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    type: { type: String, enum: ['boolean', 'single', 'multiple', 'all'], required: true },
    content: { type: String, required: true },
    options: [{ type: String, required: true }],
    correct_answers: [{ type: String, required: true }],
    score: { type: Number, required: true, min: 0 },
}, {
    timestamps: true
});


const Question = mongoose.models?.Question || mongoose.model("Question", QuestionSchema);
export default Question;