const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (userId, expires, secret = config.secret) => {
    let payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        expires,
    };

    let token = jwt.sign(payload, secret);
    return token;
};

const generateAuthToken = async(user) => {
    let tokenExpires = Math.floor(Date.now() / 1000) + 300 * 60;
    let token = generateToken(user._id, tokenExpires);
    return { token, expires: new Date(tokenExpires * 1000).toLocaleString() };
};

module.exports = { generateAuthToken };