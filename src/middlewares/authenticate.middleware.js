const passport = require("passport");
const httpStatus = require("http-status");

const verifyCallback =
    (req, res, resolve, reject) => async(err, user, info) => {
        if (err || !user || info) {
            //return reject(new Error("Unuauthorized access"));
            return res
                .status(httpStatus.UNAUTHORIZED)
                .send({ message: "Unauthorized Access", error: [err, info] });
        }
        req.user = user;
        resolve();
    };

const auth = async(req, res, next) => {
    return new Promise((resolve, reject) => {
            passport.authenticate(
                "jwt", { session: false },
                verifyCallback(req, res, resolve, reject)
            )(req, res, next);
        })
        .then(() => next())
        .catch((err) => next(err));
};

module.exports = { auth };