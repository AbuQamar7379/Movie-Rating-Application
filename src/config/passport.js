const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { UserModel } = require("../models");
const config = require("./config");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
};

const jwtVerify = async(payload, done) => {
    try {
        let { sub } = payload;
        let user = await UserModel.findById(sub);
        if (!user) {
            done(null, false);
        }
        done(null, user);
    } catch (err) {
        done(err, false);
    }
};

const jwtStrategy = new JwtStrategy(options, jwtVerify);

module.exports = { jwtStrategy };