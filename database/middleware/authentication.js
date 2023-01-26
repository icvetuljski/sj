import jwt from "jsonwebtoken";
import {ADMINISTRATOR, MODERATOR} from "../models/userTypes.js";
import User from "../models/user.js";

export const authentication = (request, response, next) => {
    try {
        if (!request.headers.authorization) {
            response.status(400).json({message: "Token is missing"});
            return;
        }

        const token = request.headers.authorization.split(" ")[1];
        if (!token) {
            response.status(400).json({message: "error"});
            return;
        }
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        request.headers.userId = decodedToken.userId;
        request.headers.userType = decodedToken.userType;
        next();
    } catch (error) {
        response.status(500).json({message: error.details});
    }
}

export const checkIfAdmin = (request, response, next) =>{
    if (request.headers.userType === ADMINISTRATOR) {
        next();
    }
    else {
        response.status(403).json({message: "Samo administrator moze to da radi"});
    }
}

export const checkIfModerator = (request, response, next) =>{
    if (request.headers.userType === MODERATOR) {
        next();
    }
    else {
        response.status(403).json({message: "Samo moderator moze to da radi"});
    }
}
