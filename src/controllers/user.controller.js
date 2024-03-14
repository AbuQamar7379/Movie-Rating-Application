const httpStatus = require("http-status");
const { userService, tokenService } = require("../services");

const register = async(req, res) => {
    try {
        let userData = req.body;
        let user = await userService.registerUser(userData);
        return res.status(httpStatus.CREATED).send(user);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const login = async(req, res) => {
    try {
        let userData = req.body;
        let user = await userService.loginUser(userData);
        let token = await tokenService.generateAuthToken(user);
        return res.status(httpStatus.OK).send({ user, token });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

module.exports = { register, login };