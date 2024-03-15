const Joi = require("joi");
const { objectId } = require("./custom.validation");

const movieBody = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    director: Joi.string().required(),
    genre: Joi.string().required(),
    releaseYear: Joi.number().min(1990).max(new Date().getFullYear()),
    description: Joi.string().required(),
  }),
};

const movieId = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const movieQuery = {
  query: Joi.object().keys({
    genre: Joi.string(),
    releaseYear: Joi.string(),
    director: Joi.string(),
  }),
};

module.exports = { movieBody, movieId, movieQuery };
