const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    director: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: String,
        required: Number,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const movieModel = mongoose.model("movie", movieSchema);

module.exports = { movieModel };