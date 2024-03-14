const express = require("express");
const userRouter = require("./user.routes");
const movieRouter = require("./movie.routes");
const router = express.Router();

router.use("/users", userRouter);
router.use("/movies", movieRouter);

module.exports = router;