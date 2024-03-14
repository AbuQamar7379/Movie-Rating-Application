const httpStatus = require("http-status");
const { reviewRatingService } = require("../services");

const createReviewRating = async(req, res) => {
    try {
        let result = await reviewRatingService.createRevRat({
            user: req.user,
            movieId: req.params,
            data: req.body,
        });
        return res.status(httpStatus.CREATED).send(result);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const updateReviewRating = async(req, res) => {
    try {
        let { movieId, reviewId } = req.params;
        let result = await reviewRatingService.updateRevRat({
            user: req.user,
            movieId,
            reviewId,
            data: req.body,
        });
        return res.status(httpStatus.OK).send(result);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const deleteReviewRating = async(req, res) => {
    try {
        let result = await reviewRatingService.deleteRevRat(req.params);
        return res.status(httpStatus.NO_CONTENT).send({
            deletedReview: result,
            message: "Review or Rating deleted successfully",
        });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const getAllReviews_Ratings = async(req, res) => {
    try {
        let result = await reviewRatingService.getAllRevRat(req.params.id);
        return res.status(httpStatus.OK).send(result);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const getAverageRating = async(req, res) => {
    try {
        let result = await reviewRatingService.averageRating(req.params.id);
        return res.status(httpStatus.OK).send(result);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

module.exports = {
    createReviewRating,
    updateReviewRating,
    deleteReviewRating,
    getAllReviews_Ratings,
    getAverageRating,
};