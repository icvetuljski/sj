import {USER} from "../models/userTypes.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { validateInput } from "../validation/validation.js";


export const register = async(request, response) => {
    const {fullName,  username, password, userType, isBanned} = request.body;

    let validInput = await validateInput(request, response)
    if (validInput === false) {
        return;
    }

    const hashPassword = await bcrypt.hash(password,12);

    const user = new User({
        fullName: fullName,
        username: username,
        password: hashPassword,
        userType: userType,
        isBanned: isBanned
    });
    try {
        const newUser = await user.save();
        const token = jwt.sign({
            userId: newUser._id,
            userType: newUser.userType
        }, process.env.SECRET_KEY);
        response.status(200).json(`Bearer ${token}`);
    } catch(error) {
        response.status(400).json({message: error.message});
    }
}

export const login = async (request, response) => {
    const {username, password} = request.body;
    try {
        const user = await User.findOne({
            username: username
        });
        console.log(user.username)
        console.log(user.userType)
        console.log(user.password)
        console.log(password)
        if (user === null) {
            response.status(400).json({message: `User with ${username} does not exists`})
            return;
        }
        if (user.isBanned === true) {
            response.status(403).json({message: "You are banned"});
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            console.log("Ulazi ovde");
            response.status(400).json({message: "Wrong password"});
            return;
        }
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
            userType: user.userType
        }, process.env.SECRET_KEY)
        response.status(200).json(`Bearer ${token}`);
    } catch (error) {
        response.status(400).json({message: error.details});
    }
}

export const getAllUsers = async(request, response) => {
    try {
        const user = await User.find();
        if (!user) {
            response.status(400).json({ message: "Currently there are no users" });
            return;
        }
        response.status(200).json(user);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}