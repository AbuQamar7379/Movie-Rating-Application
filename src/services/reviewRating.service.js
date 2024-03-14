const { ReviewRatingModel } = require("../models");

const createRevRat = async({ user, movieId, data }) => {
    try {
        let reviewRating = await ReviewRatingModel.create({
            username: user.username,
            userId: user._id,
            movieId: movieId.id,
            review: data.review,
            rating: data.rating,
        });
        if (!reviewRating) {
            throw new Error("Failed to create review and rating");
        }
        return reviewRating;
    } catch (err) {
        throw err;
    }
};

const updateRevRat = async({ user, movieId, reviewId, data }) => {
    try {
        let updated = await ReviewRatingModel.findOneAndUpdate({ _id: reviewId }, {
            username: user.username,
            userId: user._id,
            movieId,
            review: data.review,
            rating: data.rating,
        }, { new: true });

        if (!updated) {
            throw new Error("Review doesn't find with the given id");
        }

        return updated;
    } catch (err) {
        throw err;
    }
};

const deleteRevRat = async({ reviewId }) => {
    try {
        let result = await ReviewRatingModel.findOneAndDelete({ _id: reviewId });
        if (!result) {
            throw new Error("Review doesn't find with the given id");
        }
        return result;
    } catch (err) {
        throw err;
    }
};

const getAllRevRat = async(movieId) => {
    try {
        let result = await ReviewRatingModel.find({ movieId });
        if (!result) {
            throw new Error("Movie reviews doesn't find with the given id");
        }
        return result;
    } catch (err) {
        throw err;
    }
};

const averageRating = async(movieId) => {
    try {
        let movieRating = await ReviewRatingModel.find({ movieId });
        if (!movieRating) {
            throw new Error("Movie reviews doesn't find with the given id");
        }
        let totalRating = 0;

        for (let i = 0; i < movieRating.length; i++) {
            totalRating += movieRating[i].rating;
        }

        let average = Math.floor(totalRating / movieRating.length);

        return {
            averageRating: average,
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createRevRat,
    updateRevRat,
    deleteRevRat,
    getAllRevRat,
    averageRating,
};