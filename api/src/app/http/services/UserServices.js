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

export default {
    destroy,
    store,
    update,
    get,
    list,
}