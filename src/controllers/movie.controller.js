const httpStatus = require("http-status");
const { movieService } = require("../services");

const createMovie = async(req, res) => {
    try {
        let movie = await movieService.createMovie(req.body);
        return res.status(httpStatus.CREATED).send(movie);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const updateMovie = async(req, res) => {
    try {
        let movie = await movieService.updateMovie(req.params, req.body);
        return res
            .status(httpStatus.OK)
            .send({ message: "Movie updated sucessfully", movie });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const deleteMovie = async(req, res) => {
    try {
        let movie = await movieService.deleteMovie(req.params.id);
        return res
            .status(httpStatus.NO_CONTENT)
            .send({ message: "Movie deleted successfully", movie });
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const getMovieById = async(req, res) => {
    try {
        let movie = await movieService.movieById(req.params.id);
        return res.status(httpStatus.OK).send(movie);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

const getAllMovies = async(req, res) => {
    try {
        let { genre, releaseYear, director } = req.query;
        let movies = await movieService.allMovies({ genre, releaseYear, director });
        return res.status(httpStatus.OK).send(movies);
    } catch (err) {
        return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .send({ message: err.message });
    }
};

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    getAllMovies,
};