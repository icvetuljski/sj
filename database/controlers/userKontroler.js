import User from "../models/user.js";
import {ADMINISTRATOR} from "../models/userTypes.js";

export const deleteUser = async (request, response) => {
    const userId = request.body.userId;
    try {
        const user = await User.findById(userId);
        console.log(user.userType);
        if (user.userType === ADMINISTRATOR) {
            console.log('mrs')
            response.status(400).json({ message: "Cannot delete administrator accounts" });
            return;
        }
        await User.findByIdAndDelete(userId);
        response.status(200).json({ message: `Successfully deleted user: ${user.username}` });
    } catch (error) {
        response.status(400).json({ message: error.messsage });
    }
};
