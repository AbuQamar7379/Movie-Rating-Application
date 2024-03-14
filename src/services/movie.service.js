const { MovieModel } = require("../models");

const createMovie = async(movieData) => {
    try {
        let isMovieExist = await MovieModel.findOne({ title: movieData.title });
        if (isMovieExist) {
            throw new Error("Movie already exist!");
        }
        let movie = await MovieModel.create(movieData);
        return movie;
    } catch (err) {
        throw err;
    }
};

const updateMovie = async({ id }, movieData) => {
    try {
        let movie = await MovieModel.findOneAndUpdate({ _id: id }, movieData, {
            new: true,
        });
        if (!movie) {
            throw new Error("Movie doesn't found for the provided id");
        }
        return movie;
    } catch (err) {
        throw err;
    }
};

const deleteMovie = async(id) => {
    try {
        let movie = await MovieModel.findOneAndDelete({ _id: id });
        if (!movie) {
            throw new Error("Movie doesn't found for the provided id");
        }
        return movie;
    } catch (err) {
        throw err;
    }
};

const movieById = async(id) => {
    try {
        let movie = await MovieModel.findById(id);
        if (!movie) {
            throw new Error("Movie doesn't found for the provided id");
        }
        return movie;
    } catch (err) {
        throw err;
    }
};

const allMovies = async({ genre, releaseYear, director }) => {
    let allMovies;
    if (genre || releaseYear || director) {
        allMovies = await MovieModel.find({
            $or: [{ genre }, { releaseYear }, { director }],
        });
    } else {
        allMovies = await MovieModel.find({});
    }
    return allMovies;
};

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    movieById,
    allMovies,
};