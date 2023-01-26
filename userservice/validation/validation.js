import userModel from "../models/userModel.js";
import Joi from "joi";

const schema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string().min(4).max(15).required(),
    userType: Joi.string().valid('USER','MODERATOR', 'ADMINISTRATOR').required(),
    isBanned: Joi.boolean().required()
});

//export const validateRegister = async (fullName, username, password, email, role, response) => {
export const validateInput = async (request, response) => {
    const {username} = request.body;
    if (await isUsernameTaken(username)) {
        return false;
    }
    return Joi.validate(request.body, schema, (error) => {
        if (error) {
            return false;
        }
        return true;
    });
}


const isUsernameTaken = async (username) => {
    return userModel.findOne({username: username});
}