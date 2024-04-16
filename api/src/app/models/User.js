import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, enum:["teacher", "student", "admin"], required: true },
}, {
    timestamps: true
});


const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;