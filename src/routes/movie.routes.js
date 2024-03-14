const express = require("express");
const { movieController, reviewRatingController } = require("../controllers");
const { validation, auth } = require("../middlewares");
const { movie, reviewRating } = require("../validations");
const router = express.Router();

const validate = {
    createMovie: {
        movieBody: validation.validateBody(movie.movieBody),
    },
    updateMovie: {
        movieId: validation.validateId(movie.movieId),
        movieBody: validation.validateBody(movie.movieBody),
    },
    deleteMovie: {
        movieId: validation.validateId(movie.movieId),
    },
    getMovieById: {
        movieId: validation.validateId(movie.movieId),
    },
    createReviewRating: {
        movieId: validation.validateId(movie.movieId),
        reviewRatingBody: validation.validateBody(reviewRating.reviewRatingBody),
    },
    updateReviewRating: {
        reviewRatingId: validation.validateId(reviewRating.reviewRatingId),
        reviewRatingBody: validation.validateBody(reviewRating.reviewRatingBody),
    },
    deleteReviewRating: {
        reviewRatingId: validation.validateId(reviewRating.reviewRatingId),
    },
    getAllReviews_Ratings: {
        movieId: validation.validateId(movie.movieId),
    },
    getAverageRating: {
        movieId: validation.validateId(movie.movieId),
    },
};

// Movie Router

router.post("/", validate.createMovie.movieBody, movieController.createMovie);
router.put(
    "/:id",
    validate.updateMovie.movieId,
    validate.updateMovie.movieBody,
    movieController.updateMovie
);
router.delete(
    "/:id",
    validate.deleteMovie.movieId,
    movieController.deleteMovie
);
router.get("/:id", validate.getMovieById.movieId, movieController.getMovieById);
router.get("/", movieController.getAllMovies);

// Rating and Review Router

router.post(
    "/:id/reviews",
    auth,
    validate.createReviewRating.movieId,
    validate.createReviewRating.reviewRatingBody,
    reviewRatingController.createReviewRating
);
router.put(
    "/:movieId/reviews/:reviewId",
    auth,
    validate.updateReviewRating.reviewRatingId,
    validate.updateReviewRating.reviewRatingBody,
    reviewRatingController.updateReviewRating
);
router.delete(
    "/:movieId/reviews/:reviewId",
    auth,
    validate.deleteReviewRating.reviewRatingId,
    reviewRatingController.deleteReviewRating
);
router.get(
    "/:id/reviews",
    validate.getAllReviews_Ratings.movieId,
    reviewRatingController.getAllReviews_Ratings
);
router.get(
    "/:id/averageRating",
    validate.getAverageRating.movieId,
    reviewRatingController.getAverageRating
);

module.exports = router;