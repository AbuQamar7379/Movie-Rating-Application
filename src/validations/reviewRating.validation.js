const Joi = require("joi");
const { objectId } = require("./custom.validation");

const reviewRatingBody = {
  body: Joi.object().keys({
    review: Joi.string(),
    rating: Joi.number().min(0).max(5),
  }),
};

const reviewRatingId = {
  params: Joi.object().keys({
    movieId: Joi.string().custom(objectId),
    reviewId: Joi.string().custom(objectId),
  }),
};

module.exports = { reviewRatingBody, reviewRatingId };
