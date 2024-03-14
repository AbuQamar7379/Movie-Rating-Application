const express = require("express");
const { userController } = require("../controllers");
const { validation } = require("../middlewares");
const { user } = require("../validations");
const router = express.Router();

const validate = {
    validateRegister: validation.validateBody(user.register),
    validateLogin: validation.validateBody(user.login),
};

router.post("/register", validate.validateRegister, userController.register);
router.post("/login", validate.validateLogin, userController.login);

module.exports = router;