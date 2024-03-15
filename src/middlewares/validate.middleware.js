const httpStatus = require("http-status");

const validateBody = (schema) => (req, res, next) => {
  let { error } = schema.body.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error });
  }
  next();
};

const validateQuery = (schema) => (req, res, next) => {
  let { error } = schema.query.validate(req.query);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error });
  }
  next();
};

const validateId = (schema) => async (req, res, next) => {
  let { id, movieId, reviewId } = req.params;

  if (movieId && reviewId) {
    let movie = schema.params.validate(req.params);
    let review = schema.params.validate(req.params);

    if (movie.error || review.error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: [movie.error, review.error] });
    }
  }

  let { error } = schema.params.validate(req.params);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).send({ message: error });
  }

  next();
};

module.exports = { validateBody, validateId, validateQuery };
