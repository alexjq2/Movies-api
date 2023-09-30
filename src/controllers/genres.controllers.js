const catchError = require('../utils/catchError');
const Genres = require('../models/Genres');

const getAll = catchError(async (req, res) => {
    const genres = await Genres.findAll();
    return res.json(genres);
});

const create = catchError(async (req, res) => {
    const genres = await Genres.create(req.body);
    return res.status(201).json(genres);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const genres = await Genres.findByPk(id);
    return res.json(genres);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Genres.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const genre = await Genres.update(req.body, { where: {id}, returning: true });
    if (genre[0] === 0) return res.sendStatus(404);
    return res.json(genre[1][0]);
});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};