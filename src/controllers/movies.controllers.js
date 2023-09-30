const catchError = require('../utils/catchError');
const Movies = require('../models/Movies');
const Actors = require('../models/Actors');
const Genres = require('../models/Genres');
const Directors = require('../models/Directors');

const getAll = catchError(async (req, res) => {
    const movies = await Movies.findAll({include: [Actors, Genres, Directors]});
    return res.json(movies);
});

const create = catchError(async (req, res) => {
    const movies = await Movies.create(req.body);
    return res.status(201).json(movies);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const movies = await Movies.findByPk(id);
    return res.json(movies);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Movies.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const movie = await Movies.update(req.body, { where: {id}, returning: true });
    if (movie[0] === 0) return res.sendStatus(404);
    return res.json(movie[1][0]);
});

const setMoviesActors = catchError(async(req, res) => {
    const {id} = req.params;
    const movies = await Movies.findByPk(id);
    await movies.setActors(req.body);
    const actors = await movies.getActors()
    return res.json(actors);
});
const setMoviesGenres = catchError(async(req, res) => {
    const {id} = req.params;
    const movies = await Movies.findByPk(id);
    await movies.setGenres(req.body);
    const genres = await movies.getGenres()
    return res.json(genres);
});
const setMoviesDirectors = catchError(async(req, res) => {
    const {id} = req.params;
    const movies = await Movies.findByPk(id);
    await movies.setDirectors(req.body);
    const directors = await movies.getDirectors()
    return res.json(directors);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMoviesActors,
    setMoviesGenres,
    setMoviesDirectors
};