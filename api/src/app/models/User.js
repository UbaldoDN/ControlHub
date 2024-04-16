import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum:["teacher", "student"], required: true },
    enrolled_courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    completed_lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, {
    timestamps: true
});


const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;