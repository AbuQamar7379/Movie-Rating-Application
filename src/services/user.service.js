const { UserModel } = require("../models");

const registerUser = async(userData) => {
    try {
        let isUserExist = await UserModel.findOne({ email: userData.email });
        if (isUserExist) {
            throw new Error("User already exist!");
        }
        let user = new UserModel(userData);
        user.password = await user.hashPassword(userData.password);
        return user.save();
    } catch (err) {
        throw err;
    }
};

const loginUser = async(userData) => {
    try {
        let user = await UserModel.findOne({ email: userData.email });
        if (!user) {
            throw new Error(
                "User doesn't exist, register first, Or it's an invalid email!"
            );
        }
        if (!(await user.comparePassword(userData.password))) {
            throw new Error("Invalid Password!");
        }
        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = { registerUser, loginUser };