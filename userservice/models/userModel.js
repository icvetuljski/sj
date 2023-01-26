import mongoose from "mongoose";

const user = mongoose.Schema({
    fullName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, required: true},
    isBanned: {type: Boolean, default: false}
});

const User = mongoose.model("User", user);

export default User;
