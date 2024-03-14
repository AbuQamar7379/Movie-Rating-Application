const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function(email) {
            return validator.isEmail(email);
        },
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

userSchema.methods.hashPassword = async function(password) {
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
};

userSchema.methods.comparePassword = async function(password) {
    let user = this;
    return bcrypt.compare(password, user.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };