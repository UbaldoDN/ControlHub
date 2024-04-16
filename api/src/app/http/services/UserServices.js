import User from "../../models/User.js";

const store = async (firstName, lastName, email, role) => {
    const user = new User({
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: role
    });

    return await user.save();
}

const update = async (firstName, lastName, email, role, userId) => {
    const user = await get(userId);
    user.first_name = firstName;
    user.last_name = lastName;
    user.email = email;
    user.role = role;
    
    return await user.save();
}

const destroy = async (userId) => {
    return await User.deleteOne({ _id: userId });
}

const get = async (userId) => {
    return await User.findById(userId);
}

const list = async () => {
    return await User.find({});
}

const existsById = async (userId) => {
    return await User.exists({ _id: userId });
}

const existsByEmail = async (email) => {
    return await User.exists({ email: email });
}

const existsByIdAndEmail = async (email, userId) => {
    return await User.exists({  _id: { $ne : userId }, email: email });
}

export default {
    destroy,
    store,
    update,
    get,
    list,
    existsById,
    existsByEmail,
    existsByIdAndEmail,
}