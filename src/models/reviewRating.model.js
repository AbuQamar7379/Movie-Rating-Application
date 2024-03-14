const mongoose = require("mongoose");

const reviewRatingSchema = mongoose.Schema({
    username: {
        type: String,
    },
    userId: {
        type: String,
    },
    movieId: {
        type: String,
    },
    review: {
        type: String,
        default: "",
    },
    rating: {
        type: Number,
        default: null,
    },
}, { timestamps: true });

const reviewRatingModel = mongoose.model("review_rating", reviewRatingSchema);

module.exports = { reviewRatingModel };